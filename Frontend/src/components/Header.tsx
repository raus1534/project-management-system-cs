import { useState, useEffect } from "react";
import { AuthContextType } from "@context/AuthProvider";
import { useAuth } from "@hooks/index";
import { FaSun, FaMoon } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Header() {
  const { authInfo, handleLogout } = useAuth() as AuthContextType;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getUserName = () => {
    return authInfo?.profile?.role === "admin"
      ? "Admin"
      : authInfo?.profile?.name?.split(" ")[0];
  };

  const handleOnLogout = () => {
    handleLogout();
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (storedTheme === "dark" || prefersDark) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <header className="flex items-center justify-between h-[10vh] px-6 py-4 bg-white border-b dark:bg-gray-900 border-gray-300 dark:border-gray-700">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Hallo, {getUserName()}
        </h1>
        <p className="text-sm italic text-gray-600 dark:text-gray-400">
          Let's do some productive activities today.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 transition-colors duration-300 bg-gray-200 rounded-full dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-500" size={20} />
          ) : (
            <FaMoon className="text-gray-800" size={20} />
          )}
        </button>
        <div className="flex items-center space-x-3">
          <img
            src={
              authInfo?.profile?.role === "admin"
                ? logo
                : authInfo?.profile?.avatar
            }
            className="w-10 h-10 border-2 border-gray-300 rounded-full dark:border-gray-700"
            alt="Profile"
          />
          <button
            type="button"
            onClick={handleOnLogout}
            className="px-4 py-2 text-sm font-medium text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
