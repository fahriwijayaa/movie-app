import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useToken } from "../../hooks/useToken";

const Header: React.FC = () => {
  const { logout } = useToken();
  return (
    <header className="sticky top-0 z-50 w-full rounded-full h-16 backdrop-blur-md gap-5 flex items-center justify-end px-2">
      {/* Search Bar */}
      <div className="flex items-center w-full shadow-lg max-w-md rounded-full px-3 py-2">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-300"
        />
      </div>

      {/* Avatar */}
      <div className="flex items-center space-x-3">
        <FaUserCircle className="w-10 h-10 text-gray-600 dark:text-gray-300 cursor-pointer" />
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
