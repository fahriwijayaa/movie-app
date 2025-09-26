import React, { useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Sidebar from "../sidebar";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="h-screen font-sans w-full flex transition-all duration-300 text-white">
      {/* Sidebar */}
      <div
        className={`bg-[#070910] border-r border-gray-900 sticky top-0 self-start h-screen text-white transition-all duration-300 ${
          open ? "flex-[1.5]" : "flex-[0.5]"
        }`}
      >
        <Sidebar open={open} onClose={() => setOpen(!open)} />
      </div>

      {/* Content */}
      <div
        className={`bg-[#070910] flex flex-col relative transition-all duration-300 ${
          open ? "flex-[9]" : "flex-[10]"
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto hide-scrollbar scroll-smooth p-4">
          <div
            className={`w-full mx-auto transition-all duration-300
        ${
          open
            ? "sm:max-w-[90%] md:max-w-[85%] lg:max-w-[1000px] xl:max-w-[1048px]"
            : "sm:max-w-[95%] md:max-w-[90%] lg:max-w-[1100px] xl:max-w-[1168px]"
        }`}
          >
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
