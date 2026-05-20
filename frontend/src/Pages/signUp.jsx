import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    companyName: "",
    isAgency: null,
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      console.log(import.meta.env.VITE_API_URL);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.data.success) {

  // Save user
  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );

  // Save token
  localStorage.setItem(
    "token",
    res.data.token
  );

  toast.success(res.data.message);

  navigate("/account");
}
    } catch (error) {
      console.log("Error during sign up:", error);
      toast.error(
        error.response?.data?.message || "An error occurred during sign up.",
      );
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pb-20 pt-20">
      <div className="w-sm bg-[#f7f8f9] border border-gray-300 px-6 pt-10 pb-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Create your <br />
          PopX account
        </h1>

        {/* Form */}
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-[#f7f8f9] px-1 text-sm font-semibold text-[#8b5cf6]">
              Full Name*
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Marry Doe"
              className="w-full border border-gray-300 rounded-md px-4 py-4 outline-none focus:border-[#6C25FF] bg-transparent"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-[#f7f8f9] px-1 text-sm font-semibold text-[#8b5cf6]">
              Phone number*
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full border border-gray-300 rounded-md px-4 py-4 outline-none focus:border-[#6C25FF] bg-transparent"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-[#f7f8f9] px-1 text-sm font-semibold text-[#8b5cf6]">
              Email address*
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="marry@gmail.com"
              className="w-full border border-gray-300 rounded-md px-4 py-4 outline-none focus:border-[#6C25FF] bg-transparent"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-[#f7f8f9] px-1 text-sm font-semibold text-[#8b5cf6]">
              Password *
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="******"
              className="w-full border border-gray-300 rounded-md px-4 py-4 outline-none focus:border-[#6C25FF] bg-transparent"
            />
          </div>

          {/* Company */}
          <div className="relative">
            <label className="absolute -top-3 left-3 bg-[#f7f8f9] px-1 text-sm font-semibold text-[#8b5cf6]">
              Company name
            </label>

            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="PopX Pvt Ltd"
              className="w-full border border-gray-300 rounded-md px-4 py-4 outline-none focus:border-[#6C25FF] bg-transparent"
            />
          </div>

          {/* Radio Buttons */}
          <div>
            <p className="text-gray-800 font-medium mb-4">
              Are you an Agency?*
            </p>

            <div className="flex items-center gap-6">
              {/* YES */}
              {/* YES */}
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="radio"
    name="isAgency"
    checked={formData.isAgency === true}
    onChange={() =>
      setFormData((prev) => ({
        ...prev,
        isAgency: true,
      }))
    }
    className="accent-[#6C25FF] w-5 h-5"
  />

  <span className="text-gray-700">Yes</span>
</label>

{/* NO */}
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="radio"
    name="isAgency"
    checked={formData.isAgency === false}
    onChange={() =>
      setFormData((prev) => ({
        ...prev,
        isAgency: false,
      }))
    }
    className="accent-[#6C25FF] w-5 h-5"
  />

  <span className="text-gray-700">No</span>
</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer left-6 right-6 bg-[#6C25FF] hover:bg-[#5b1ee6] text-white font-semibold py-4 rounded-md transition-all duration-200"
          >
            Create Account
          </button>
          <p className="text-center text-sm text-gray-600">
            Already Registered?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#6C25FF] font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
