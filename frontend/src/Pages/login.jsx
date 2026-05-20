import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Login
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {

        // Save User
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        // Save Tokens
        localStorage.setItem(
          "accessToken",
          res.data.accessToken
        );

        localStorage.setItem(
          "refreshToken",
          res.data.refreshToken
        );

        toast.success(res.data.message);

        navigate("/account");
      }

    } catch (error) {

      console.log("Login Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-20 pb-20">

      <div className="w-[360px] h-[740px] bg-[#f7f8f9] border border-gray-300 px-6 pt-12 pb-12">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Signin to your <br />
          PopX account
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-lg mt-5 leading-7">
          Lorem ipsum dolor sit amet, <br />
          consectetur adipiscing elit,
        </p>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6"
        >

          {/* Email */}
          <div className="relative">

            <label className="absolute -top-3 left-3 bg-[#f7f8f9] px-1 text-sm font-semibold text-[#8b5cf6]">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full border border-gray-300 rounded-md px-4 py-4 outline-none focus:border-[#6C25FF] bg-transparent"
            />

          </div>

          {/* Password */}
          <div className="relative">

            <label className="absolute -top-3 left-3 bg-[#f7f8f9] px-1 text-sm font-semibold text-[#8b5cf6]">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-md px-4 py-4 outline-none focus:border-[#6C25FF] bg-transparent"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#6C25FF] text-white font-semibold py-4 rounded-md cursor-pointer hover:bg-[#5b1ee6] transition-all duration-200"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 mt-4">

            New user?{" "}

            <span
              onClick={() => navigate("/sign-up")}
              className="text-[#6C25FF] font-semibold cursor-pointer hover:underline"
            >
              Signup
            </span>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;