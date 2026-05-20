import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      <div className="w-[360px] h-[740px] bg-[#f7f8f9] border border-gray-300 relative px-6">

        <div className="absolute bottom-10 left-0 w-full px-6">

          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Welcome to PopX
          </h1>

          <p className="text-gray-500 text-lg mt-3 leading-7">
            Lorem ipsum dolor sit amet, <br />
            consectetur adipiscing elit,
          </p>

          {/* Buttons */}
          <div className="mt-8 space-y-4">

            <button className="w-full bg-[#6C25FF] cursor-pointer hover:bg-[#5b1ee6] text-white font-semibold py-4 rounded-lg transition-all duration-200" onClick={() => navigate("/sign-up")}>
              Create Account
            </button>

            <button className="w-full cursor-pointer bg-[#ceb5ff] hover:bg-[#c3a5ff] text-[#1d1d1d] font-semibold py-4 rounded-lg transition-all duration-200" onClick={() => navigate("/login")}>
              Already Registered? Login
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Home
