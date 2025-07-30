import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your registered email.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/students/reset-password/",
        {
          email,
          new_password: newPassword,
        },
        {
          withCredentials: true, // only if your backend sets HttpOnly cookies
        }
      );

      if (response.data.success || response.status === 200) {
        alert("Password reset successfully!");
        navigate("/login");
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error(
        "Reset password error:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message ||
          "An error occurred while resetting the password."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Reset Password
        </h2>
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">
              New Password
            </label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
