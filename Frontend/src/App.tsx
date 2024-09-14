import { useAuth } from "./hooks";
import { AuthContextType } from "@context/AuthProvider";
import AdminNavigator from "navigator/AdminNavigator";
import { Route, Routes } from "react-router";
import SignIn from "@components/auth/SignIn";
import Home from "@components/Home";
import UserNavigator from "navigator/UserNavigator";

export default function App() {
  const { authInfo } = useAuth() as AuthContextType;
  const { profile } = authInfo;

  if (profile?.role === "admin") return <AdminNavigator />;
  if (profile?.role === "user") return <UserNavigator />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}
