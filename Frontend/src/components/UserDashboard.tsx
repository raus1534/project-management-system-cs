import { getOngoingTaskUser } from "@api/task";
import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import { useAuth, useNotification } from "@hooks/index";
import { Link } from "react-router-dom";
import { AuthContextType } from "@context/AuthProvider";

export default function UserDashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const { updateNotification } = useNotification();

  const { authInfo } = useAuth() as AuthContextType;
  const { profile } = authInfo;
  const userId = profile?.id;
  const getOngoing = async () => {
    const { tasks, error } = await getOngoingTaskUser(userId!);
    if (error) return updateNotification("error", error);
    setTasks([...tasks]);
  };
  // @ts-ignore

  useEffect(() => {
    getOngoing();
    console.log(tasks);
  }, []);

  return (
    <div className="p-2 space-y-4">
      <div className="h-[78vh] overflow-scroll">
        <div className="flex flex-col justify-between px-3">
          <h1 className="text-3xl font-bold">Ongoing Tasks</h1>
          <div className="flex flex-wrap space-x-3 space-y-3">
            {tasks?.map(
              ({ _id, title, description, assignedTo, dueDate }, index) => {
                return (
                  <Link to={"/task/" + _id}>
                    <TaskCard
                      key={index}
                      title={title}
                      description={description}
                      users={assignedTo}
                      dueDate={dueDate}
                    />
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
