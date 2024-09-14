import { AuthContextType } from "@context/AuthProvider";
import { useAuth } from "@hooks/index";
import logo from "../assets/logo.png";

export default function Header() {
  const { authInfo, handleLogout } = useAuth() as AuthContextType;

  const getUserName = () => {
    if (authInfo?.profile?.role === "admin") return "Admin";
    return authInfo?.profile?.name?.split(" ")[0];
  };

  const handleOnLogout = () => {
    handleLogout();
  };
  return (
    <div className="relative flex items-center justify-between py-2 pl-5 border-b-2 border-black">
      <div>
        <h1 className="text-3xl font-extrabold uppercase">
          Hallo {getUserName()}
        </h1>
        <span className="text-xs italic font-normal">
          Let's do some productive activities today
        </span>
      </div>
      <div className="flex items-center justify-end pl-3 pr-10 border-l-2 border-black w-72">
        <div className="flex space-x-2">
          {authInfo?.profile?.role === "admin" ? (
            <img
              src={logo}
              className="w-10 border-2 rounded-full"
              alt="Admin"
            />
          ) : (
            <img
              src={authInfo?.profile?.avatar}
              className="w-10 border-2 rounded-full"
              alt="PP"
            />
          )}
          <button type="button" onClick={handleOnLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
