import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address ⚠️");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://lead-management-admin-hr-panel.onrender.com/api/auth/forgot-password',
        { email }
      );

      // Display success message from API
      alert(response.data.message || "OTP sent successfully ✅");
      
      // Pass email to the EnterOTP page
      navigate("/enter-otp", { state: { email } });
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/2 bg-[#E7F2FF] flex flex-col justify-center px-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 text-sm mb-6"
        >
          <div className="mr-2">
            <FaArrowLeft size={14} />
          </div>
          Back
        </button>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Enter your registered email address. We'll send you a code to reset your password.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="text-gray-500 text-xs mb-1 block">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rashmika02@example.com"
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 mb-4"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-md transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>

      <div className="w-1/2 bg-white flex justify-center items-center">
        <img
          src="/src/assets/auth-illustration.png"
          alt="Authentication Illustration"
          className="w-[80%] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ForgotPassword; 