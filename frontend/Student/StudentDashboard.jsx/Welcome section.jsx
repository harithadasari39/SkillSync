import React from "react";

const WelcomeSection = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-2">
        Welcome back, Haritha
      </h3>
      <p className="text-sm text-gray-700 mb-4">Learning Progress</p>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div className="bg-blue-600 h-4 rounded-full w-[40%]"></div>
      </div>
      <div className="flex gap-2 text-sm">
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Enrolled</span>
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Awaiting Placement</span>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Certified</span>
      </div>
    </div>
  );
};

export default WelcomeSection;

