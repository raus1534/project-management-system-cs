import { Link } from "react-router-dom";
import { IoLogOutOutline, IoMoon, IoSunny } from "react-icons/io5";
import { useState, useEffect } from "react";
import Container from "./Container";
import logo from "../assets/logo.png";
import { AuthContextType } from "@context/AuthProvider";
import { useAuth } from "@hooks/index";

export default function Navbar() {
  const { authInfo, handleLogout } = useAuth() as AuthContextType;
  const { isLoggedIn, profile } = authInfo;
  const avatar = profile?.avatar;
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode by adding/removing "dark" class from the root HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="transition-colors duration-300 bg-white shadow-md dark:bg-gray-900">
      <Container className="p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="logo"
              className="h-8 transition-transform transform sm:h-10 hover:scale-105"
            />
            <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
              Project Management System
            </span>
          </Link>

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-gray-800 transition-colors duration-300 dark:text-gray-200"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <IoSunny size={24} /> : <IoMoon size={24} />}
            </button>

            {/* User Actions */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="w-10 h-10 p-1 overflow-hidden border-2 border-gray-300 rounded-full dark:border-gray-500"
                >
                  <img
                    src={avatar || logo}
                    alt="User Avatar"
                    className="rounded-full"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 transition-colors duration-300 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400"
                >
                  <IoLogOutOutline size={28} />
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="font-semibold text-gray-800 text-md dark:text-gray-200 hover:underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
