import React from "react";
import { FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Header from "../Landingpage/Header";
import Footer from "../Landingpage/Footer";
import { useNavigate } from "react-router-dom";

// import skillsynclogo from "../assets/skillsynclogo.JPG";

const LoginScreen = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8"
      // style={{ backgroundImage: `url(${skillsynclogo})` }}
    >
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white bg-opacity-90 shadow-2xl rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Student Login
          </h2>

          {/* Login Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Email or Mobile Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email or mobile"
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 mb-2 sm:mb-0">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Logins */}
          <div className="flex flex-col space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border mt-4 py-2 rounded hover:bg-gray-100"
            >
              <FcGoogle className="text-xl" />
              Login with Google
            </button>
            <button className="flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200">
              <FaLinkedinIn className="mr-2" /> Login with LinkedIn
            </button>
          </div>

          {/* Toggle to Register */}
          <p className="text-center text-sm text-gray-600 mt-6">
            New to SkillSync?{" "}
            <a
              href="#"
              className="text-blue-500  font-extrabold hover:underline"
              onClick={() => navigate("/register")}
            >
              Create an Account
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginScreen;
