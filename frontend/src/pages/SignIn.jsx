import React from 'react'

const SignIn = () => {
  const primaryColor = "#F0E4D3"
  const hoverColor = "#DCC5B2"
  const bgColor = "#FAF7F3"
  const borderColor = "#D9A299"

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div 
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
        style={{ borderColor: primaryColor }}
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: borderColor }}>
          Sign In
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2"
              style={{
                borderColor: borderColor,
                backgroundColor: primaryColor,
                focusRingColor: borderColor
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2"
              style={{
                borderColor: borderColor,
                backgroundColor: primaryColor
              }}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: borderColor, color: "white" }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = hoverColor}
            onMouseOut={e => e.currentTarget.style.backgroundColor = borderColor}
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" style={{ color: borderColor }} className="font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignIn
