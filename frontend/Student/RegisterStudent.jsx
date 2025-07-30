import React, { useState } from "react";
import axios from "axios";

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    graduationYear: "",
    learningMode: "",
    skill: "",
    resume: null,
    agreed: false,
    gender: "",
    emailOtp: "",
  });

  const [errors, setErrors] = useState({});
  const [otpState, setOtpState] = useState({
    emailSent: false,
    emailVerified: false,
  });

  const skills = ["Java", "Python", "React", "QA", "DevOps"];
  const years = Array.from({ length: 10 }, (_, i) => 2025 - i);
  const qualifications = ["B.Tech", "B.Sc", "MCA", "MBA", "Other"];
  const learningOptions = ["Online", "Offline", "Hybrid"];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!otpState.emailVerified) newErrors.emailOtp = "Email not verified.";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required.";
    if (!formData.graduationYear)
      newErrors.graduationYear = "Year is required.";
    if (!formData.learningMode)
      newErrors.learningMode = "Choose a learning mode.";
    if (!formData.skill) newErrors.skill = "Select a skill.";
    if (!formData.resume) newErrors.resume = "Resume is required.";
    if (!formData.agreed)
      newErrors.agreed = "You must agree to terms and privacy.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmailOtp = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/students/send-email-otp/", {
        email: formData.email,
      });
      alert("Email OTP sent!");
      setOtpState((prev) => ({ ...prev, emailSent: true }));
    } catch (error) {
      alert("Failed to send email OTP.");
    }
  };

  const verifyEmailOtp = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/students/verify-email-otp/",
        {
          email: formData.email,
          otp: formData.emailOtp,
        }
      );
      if (res.data.verified) {
        alert("Email OTP verified!");
        setOtpState((prev) => ({ ...prev, emailVerified: true }));
      } else {
        setErrors((prev) => ({ ...prev, emailOtp: "Invalid email OTP" }));
      }
    } catch {
      alert("Email OTP verification failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value && key !== "emailOtp") {
        data.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/students/register/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        alert("Registered successfully!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      alert("Registration error.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-4"
    >
      <h2 className="text-3xl font-bold text-center text-blue-700">Register</h2>

      {/* Full Name */}
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      {errors.fullName && (
        <p className="text-red-500 text-sm">{errors.fullName}</p>
      )}

      {/* Email + OTP */}
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="button"
          onClick={sendEmailOtp}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Send OTP
        </button>
      </div>
      {otpState.emailSent && !otpState.emailVerified && (
        <div className="flex gap-2">
          <input
            type="text"
            name="emailOtp"
            placeholder="Email OTP"
            value={formData.emailOtp}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <button
            type="button"
            onClick={verifyEmailOtp}
            className="bg-green-500 text-white px-3 rounded"
          >
            Verify
          </button>
        </div>
      )}
      {errors.emailOtp && (
        <p className="text-red-500 text-sm">{errors.emailOtp}</p>
      )}

      {/* Mobile */}
      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        maxLength={10}
        className="w-full border p-2 rounded"
      />
      {errors.mobile && (
        <p className="text-red-500 text-sm">{errors.mobile}</p>
      )}

      {/* Passwords */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
      )}

      {/* Gender */}
      <div>
        <label className="block text-gray-600">Gender:</label>
        {["Male", "Female", "Other"].map((g) => (
          <label key={g} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="gender"
              value={g}
              checked={formData.gender === g}
              onChange={handleChange}
            />
            <span className="ml-2">{g}</span>
          </label>
        ))}
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
      </div>

      {/* Qualification */}
      <select
        name="qualification"
        value={formData.qualification}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Qualification</option>
        {qualifications.map((q) => (
          <option key={q}>{q}</option>
        ))}
      </select>
      {errors.qualification && (
        <p className="text-red-500 text-sm">{errors.qualification}</p>
      )}

      {/* Graduation Year */}
      <select
        name="graduationYear"
        value={formData.graduationYear}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Graduation Year</option>
        {years.map((y) => (
          <option key={y}>{y}</option>
        ))}
      </select>
      {errors.graduationYear && (
        <p className="text-red-500 text-sm">{errors.graduationYear}</p>
      )}

      {/* Learning Mode */}
      <div>
        <label className="block text-gray-600">Learning Mode:</label>
        {learningOptions.map((mode) => (
          <label key={mode} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="learningMode"
              value={mode}
              checked={formData.learningMode === mode}
              onChange={handleChange}
            />
            <span className="ml-2">{mode}</span>
          </label>
        ))}
        {errors.learningMode && (
          <p className="text-red-500 text-sm">{errors.learningMode}</p>
        )}
      </div>

      {/* Skill */}
      <select
        name="skill"
        value={formData.skill}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Skill</option>
        {skills.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      {errors.skill && <p className="text-red-500 text-sm">{errors.skill}</p>}

      {/* Resume */}
      <input
        type="file"
        name="resume"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}

      {/* Terms */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="agreed"
          checked={formData.agreed}
          onChange={handleChange}
        />
        I agree to Terms and Privacy Policy
      </label>
      {errors.agreed && <p className="text-red-500 text-sm">{errors.agreed}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={!otpState.emailVerified}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterStudent;
