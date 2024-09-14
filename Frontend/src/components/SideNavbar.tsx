import { useState } from "react";
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

  const handleOnClick = (activeLink: any) => {
    setActiveNavLink(activeLink);
  };

  function handleURLChange() {
    var currentURL = window.location.href;
    const currentComponent = currentURL.split("/")[3];
    setActiveNavLink(
      currentComponent.charAt(0).toUpperCase() + currentComponent.slice(1)
    );
  }

  // Event listener for URL changes for Navbar Styling
  window.addEventListener("popstate", handleURLChange);

  return (
    <nav className="w-64 h-screen border-r border-gray-300 pt-9 ">
      <div className="flex items-center justify-center p-1 pl-4 space-x-2 ">
        <div className="w-2/5">
          <img className="w-full" src={logo} alt="Logo" />
        </div>
        <span className="text-lg font-bold uppercase text-wrap">
          Project Management System
        </span>
      </div>
      <div className="mt-6 space-y-2">
        <NavLink
          onClick={handleOnClick}
          to="/"
          Icon={BiSolidDashboard}
          active={activeNavLink}
        >
          Dashboard
        </NavLink>

        {authInfo?.profile?.role === "admin" ? (
          <NavLink
            onClick={handleOnClick}
            to="/tasks"
            Icon={MdCoPresent}
            active={activeNavLink}
          >
            Tasks
          </NavLink>
        ) : null}
      </div>
    </nav>
  );
}

interface NavLinkProps {
  children: string; // The link text or any content inside the NavLink
  Icon: IconType; // The icon component
  to: string; // The URL path
  onClick: (activeLink: string) => void; // Function to handle click event
  active: string; // The currently active link
}
const NavLink = ({ children, Icon, to, onClick, active }: NavLinkProps) => {
  const defaultClassName =
    "flex items-center w-11/12 p-3 pl-5 space-x-3 rounded-r-full ";
  const getClassName = () => {
    if (active === children) return defaultClassName + "bg-primary text-white";
    return defaultClassName;
  };
  return (
    <Link onClick={() => onClick(children)} to={to} className={getClassName()}>
      <Icon size={20} />
      <span className="text-lg font-semibold">{children}</span>
    </Link>
  );
};
