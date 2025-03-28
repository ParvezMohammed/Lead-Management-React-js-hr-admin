import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Here you would typically make an API call to verify credentials
    // For demo purposes, we'll use a simple check
    if (email && password) {
      // Store auth data
      const userData = {
        email,
        name: "Rashmika", // This would come from API
        role: "HR Admin", // This would come from API
        token: "demo-token", // This would come from API
      };

      // Store user info if remember me is checked or it's a successful login
      if (rememberMe) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userData', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userData', JSON.stringify(userData));
      }
      
      // Navigate to dashboard
      navigate('/');
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center items-center">
        <div className="flex items-center gap-2 mb-10">
          <img src="/src/assets/hrms-logo.svg" alt="HRMS Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">HRMS</span>
        </div>

        <div className="max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Welcome to the HRM System
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Log in to manage your personal information, time and attendance, and performance reviews securely. 
            Your data is protected with the highest security standards.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-[#E7F2FF] p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold mb-1">
              Welcome <span className="text-yellow-500">👋</span>
            </h1>
            <p className="text-gray-600">Please login here</p>
          </div>

          <h2 className="text-xl font-bold text-blue-900 mb-6">Admin Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm text-gray-700 font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rashmika02@example.com"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                Remember Me
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#3b82f6] text-white py-3 rounded-lg hover:bg-[#2563eb] transition-all duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 