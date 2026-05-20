import React from "react";
import { IoMdCamera } from "react-icons/io";
const AccountPage = () => {

const user =
  JSON.parse(localStorage.getItem("user")) || {};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-20 pb-20">

      <div className="w-[360px] h-[740px] bg-[#f7f8f9] border border-gray-300">

        {/* Header */}
        <div className="bg-white px-5 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-700">
            Account Settings
          </h1>
        </div>

        {/* Profile Section */}
        <div className="px-5 py-7">

          <div className="flex items-start gap-4">

            {/* Profile Image */}
            <div className="relative">

              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
              />

              <div className="absolute bottom-0 right-0 bg-[#6C25FF] p-1.5 rounded-full">
                <IoMdCamera size={14} className="text-white" />
              </div>

            </div>

            {/* Dynamic User Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {user?.fullName}
              </h2>

              <p className="text-gray-600 font-medium mt-1">
                {user?.email}
              </p>
            </div>

          </div>

          <p className="mt-8 text-gray-600 font-semibold leading-8 text-[15px]">
            Welcome to your PopX account.
          </p>

        </div>

      </div>

    </div>
  );
};

export default AccountPage;