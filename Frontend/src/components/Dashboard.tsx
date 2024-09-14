import { getOngoingTask } from "@api/task";
import TaskCard from "./TaskCard";
import { useEffect, useState } from "react";
import { useNotification } from "@hooks/index";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const getOngoing = async () => {
    const { tasks, error } = await getOngoingTask();
    if (error) return updateNotification("error", error);
    setTasks([...tasks]);
  };
  // @ts-ignore

  useEffect(() => {
    getOngoing();
  }, []);

  return (
    <div className="p-2 space-y-4">
      <div className="flex justify-end space-x-3">
        <button
          className="flex justify-center align-center select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none  space-x-1 active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={() => {
            navigate("/addUser");
          }}
        >
          Add User
        </button>
        <button
          className="flex justify-center align-center select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none  space-x-1 active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={() => {
            navigate("/addTask");
          }}
        >
          Add Task
        </button>
      </div>
      <div className="h-[78vh] overflow-scroll">
        <div className="flex flex-col justify-between px-3">
          <h1 className="text-3xl font-bold">Ongoing Tasks</h1>
          <div className="flex flex-wrap space-x-3 space-y-3">
            {tasks.map(
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
