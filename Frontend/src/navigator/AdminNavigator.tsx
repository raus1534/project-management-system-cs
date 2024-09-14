import Task from "@components/admin/Task";
import CreateTask from "@components/CreateTask";
import CreateUser from "@components/CreateUser";
import Dashboard from "@components/Dashboard";
import Header from "@components/Header";
import InfoBar from "@components/InfoBar";
import SideNavbar from "@components/SideNavbar";
import TaskInfo from "@components/TaskInfo";
import { Route, Routes } from "react-router";

export default function AdminNavigator() {
  return (
    <>
      <div className="flex h-screen">
        <SideNavbar />
        <div className="flex flex-col flex-1 h-screen">
          <Header />
          <div className="flex flex-grow">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Task />} />
                <Route path="/task/:taskId" element={<TaskInfo />} />
                <Route path="/addTask" element={<CreateTask />} />
                <Route path="/addUser" element={<CreateUser />} />
              </Routes>
            </div>
            <InfoBar />
          </div>
        </div>
      </div>
    </>
  );
}
