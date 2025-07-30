import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaBook,
  FaClipboardList,
  FaCertificate,
  FaBriefcase,
  FaCalendarAlt,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard" },
    { icon: <FaUser />, label: "My Profile" },
    { icon: <FaBook />, label: "Training Programs" },
    { icon: <FaClipboardList />, label: "My Enrollments" },
    { icon: <FaCertificate />, label: "Certifications" },
    { icon: <FaBriefcase />, label: "Job Listings" },
    { icon: <FaCalendarAlt />, label: "Interviews" },
    { icon: <FaComments />, label: "Support" },
    { icon: <FaSignOutAlt />, label: "Logout" },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-4 hidden md:block">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Student Dashboard</h2>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 cursor-pointer"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;