import Header from "@components/Header";
import InfoBar from "@components/InfoBar";
import SideNavbar from "@components/SideNavbar";
import TaskInfo from "@components/TaskInfo";
import UserDashboard from "@components/UserDashboard";
import { Route, Routes } from "react-router";

export default function UserNavigator() {
  return (
    <>
      <div className="flex h-screen">
        <SideNavbar />
        <div className="flex flex-col flex-1 h-screen">
          <Header />
          <div className="flex flex-grow">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<UserDashboard />} />
                <Route path="/task/:taskId" element={<TaskInfo />} />
              </Routes>
            </div>
            <InfoBar />
          </div>
        </div>
      </div>
    </>
  );
}
