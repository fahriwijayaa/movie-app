import React from "react";
import { FaHome, FaList } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router";

interface SidebarProps {
  open: boolean;
  onClose: () => void; // fungsi untuk toggle dari parent
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [{ name: "Home", icon: <MdDashboard />, path: "/" }];

  return (
    <div className="h-screen text-white flex flex-col py-6 px-2 sm:px-4 shadow-lg transition-all duration-300">
      {/* Logo bisa di-klik untuk toggle */}
      <div
        className="text-center mb-8 cursor-pointer select-none"
        onClick={onClose}
      >
        {open ? (
          <div className="text-2xl font-bold">Lightning</div>
        ) : (
          <div className="text-2xl">L</div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex items-center px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors ${
              open ? "gap-3 justify-start" : "justify-center"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {open && <span className="font-medium">{item.name}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
