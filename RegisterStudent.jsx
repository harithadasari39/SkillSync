import React, { useState } from "react";

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    graduationYear: "",
    learningMode: "", // Changed from array to single value
    skill: "",
    resume: null,
    agreed: false,
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpVerified, setOtpVerified] = useState(false);

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
    if (!formData.mobile) newErrors.mobile = "Mobile number is required.";
    if (!otpVerified) newErrors.otp = "OTP not verified.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required.";
    if (!formData.graduationYear)
      newErrors.graduationYear = "Year is required.";
    if (!formData.learningMode)
      newErrors.learningMode = "Choose a learning mode.";
    if (!formData.skill) newErrors.skill = "Select a skill.";
    if (!formData.agreed)
      newErrors.agreed = "You must agree to terms and privacy.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = async () => {
    const { mobile } = formData;

    if (!/^\d{10}$/.test(mobile)) {
      setErrors({ ...errors, mobile: "Enter a valid 10-digit number" });
      return;
    }

    try {
      await axios.post("/api/send-otp", { mobile }); // Replace with real endpoint
      setOtpSent(true);
      alert("OTP sent to mobile!");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const response = await axios.post("/api/students/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Registered successfully!");
        // Optionally redirect to dashboard
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
          Student Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* Mobile + OTP */}
          <div className="flex gap-2">
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={sendOtp}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Send OTP
            </button>
          </div>
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}

          {otpSent && !otpVerified && (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={verifyOtp}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Verify
              </button>
            </div>
          )}
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          {/* Qualification */}
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Highest Qualification</option>
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
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Year of Graduation</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
          {errors.graduationYear && (
            <p className="text-red-500 text-sm">{errors.graduationYear}</p>
          )}

          {/* Learning Mode - Only one selectable (Radio behavior) */}
          <div className="space-y-1">
            <label className="font-medium block text-gray-700">
              Preferred Learning Mode:
            </label>
            <div className="flex gap-4 flex-wrap">
              {learningOptions.map((mode) => (
                <label key={mode} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="learningMode"
                    value={mode}
                    checked={formData.learningMode === mode}
                    onChange={handleChange}
                  />
                  {mode}
                </label>
              ))}
            </div>
            {errors.learningMode && (
              <p className="text-red-500 text-sm">{errors.learningMode}</p>
            )}
          </div>

          {/* Skill */}
          <select
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Primary Skill Interested</option>
            {skills.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {errors.skill && (
            <p className="text-red-500 text-sm">{errors.skill}</p>
          )}

          {/* Resume Upload */}
          <h4>Upload Resume::</h4>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full px-2 py-1"
          />

          {/* Terms & Conditions */}
          <label className="flex items-center text-sm gap-2">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />
            I agree to the Terms & Privacy Policy
          </label>
          {errors.agreed && (
            <p className="text-red-500 text-sm">{errors.agreed}</p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
