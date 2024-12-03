import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import teen from "./img.png";

const AdminNavbar = ({ activeComponent, setActiveComponent }) => {
  const [shadow, setShadow] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    sessionStorage.removeItem("user");
    router.push("/sign-in");
  };

  useEffect(() => {
    const handleShadow = () => setShadow(window.scrollY >= 90);
    window.addEventListener("scroll", handleShadow);

    return () => window.removeEventListener("scroll", handleShadow);
  }, []);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <div className="fixed top-4 left-4 z-[101]">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-2 rounded-lg shadow hover:opacity-90 transition-all"
        >
          {sidebarOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-800 via-gray-900 to-black z-[100] transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${shadow ? "shadow-lg shadow-blue-500" : ""}`}
      >
        <div className="flex flex-col items-center py-6 w-64">
          {/* Logo and Admin Title */}
          <div className="flex items-center space-x-4 mb-8">
            <Image
              src={teen}
              width="40"
              height="40"
              alt="Logo"
              className="rounded-full border-2 border-purple-500"
            />
            <span className="text-lg font-semibold text-white">Admin</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4 w-full px-4">
            <button
              onClick={() => {
                setActiveComponent("home");
                setSidebarOpen(false); // Close sidebar after navigation
              }}
              className={`${
                activeComponent === "home"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "hover:bg-gray-700 text-gray-300"
              } px-4 py-2 rounded-lg w-full text-left transition-all`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveComponent("transactions");
                setSidebarOpen(false); // Close sidebar after navigation
              }}
              className={`${
                activeComponent === "transactions"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "hover:bg-gray-700 text-gray-300"
              } px-4 py-2 rounded-lg w-full text-left transition-all`}
            >
              Transactions
            </button>
            <button
              onClick={() => {
                handleSignOut();
                setSidebarOpen(false); // Close sidebar after sign-out
              }}
              className="hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg w-full text-left transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Overlay (closes sidebar on click) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[99]"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminNavbar;
