import { useState, useEffect } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { MdCoPresent } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "@hooks/index";
import { AuthContextType } from "@context/AuthProvider";
import { IconType } from "react-icons";
import logo from "../assets/logo.png";

export default function SideNavbar() {
  const [activeNavLink, setActiveNavLink] = useState("Dashboard");
  const { authInfo } = useAuth() as AuthContextType;

  useEffect(() => {
    function handleURLChange() {
      const currentComponent = window.location.pathname.split("/")[1];
      setActiveNavLink(
        currentComponent.charAt(0).toUpperCase() + currentComponent.slice(1)
      );
    }
    window.addEventListener("popstate", handleURLChange);
    handleURLChange(); // Initialize the active link on mount
    return () => {
      window.removeEventListener("popstate", handleURLChange);
    };
  }, []);

  return (
    <nav className="w-64 h-screen bg-white border-r dark:bg-gray-900 dark:border-gray-700 pt-9">
      <div className="flex items-center justify-center p-1 pl-4 space-x-2">
        <div className="w-2/5">
          <img className="w-full" src={logo} alt="Logo" />
        </div>
        <span className="text-lg font-bold text-gray-900 uppercase dark:text-gray-200">
          Project Management System
        </span>
      </div>
      <div className="mt-6 space-y-2">
        <NavLink
          onClick={setActiveNavLink}
          to="/"
          Icon={BiSolidDashboard}
          active={activeNavLink}
        >
          Dashboard
        </NavLink>

        {authInfo?.profile?.role === "admin" && (
          <NavLink
            onClick={setActiveNavLink}
            to="/tasks"
            Icon={MdCoPresent}
            active={activeNavLink}
          >
            Tasks
          </NavLink>
        )}
      </div>
    </nav>
  );
}

interface NavLinkProps {
  children: string;
  Icon: IconType;
  to: string;
  onClick: (activeLink: string) => void;
  active: string;
}

const NavLink = ({ children, Icon, to, onClick, active }: NavLinkProps) => {
  const defaultClassName =
    "flex items-center w-11/12 p-3 pl-5 space-x-3 rounded-r-full transition-colors duration-300";
  const activeClassName =
    "bg-primary text-white dark:bg-gray-700 dark:text-white";
  const inactiveClassName =
    "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800";

  return (
    <Link
      onClick={() => onClick(children)}
      to={to}
      className={`${defaultClassName} ${
        active === children ? activeClassName : inactiveClassName
      }`}
    >
      <Icon size={20} />
      <span className="text-lg font-semibold">{children}</span>
    </Link>
  );
};
