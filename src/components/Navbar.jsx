import {
  FaBell,
  FaCaretDown,
  FaSearch,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ heading }) => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Try to get user data from localStorage first, then sessionStorage
    const storedData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleNotification = () => {
    navigate("/notification");
  };

  const handleLogout = () => {
    // Clear both storage types to ensure complete logout
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userData');
    
    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center mb-6 relative">
      <h2 className="text-2xl font-semibold text-gray-800">{heading}</h2>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-[200px] bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <button 
          onClick={handleNotification}
          className="p-2.5 bg-white border rounded-lg hover:bg-gray-50 transition-colors relative"
        >
          <FaBell className="text-gray-600 text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!isOpen)}
            className="flex items-center gap-3 bg-white border rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            <FaUserCircle className="text-2xl text-gray-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-800">{userData?.name || 'User'}</p>
              <p className="text-sm text-gray-500">{userData?.role || 'Admin'}</p>
            </div>
            <FaCaretDown className="text-gray-600" />
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg overflow-hidden w-48 z-50">
              <button 
                className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                onClick={() => navigate("/profile")}
              >
                <FaUser className="text-gray-600" />
                <span>Profile</span>
              </button>
              <button 
                className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-red-600" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
