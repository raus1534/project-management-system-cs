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

  useEffect(() => {
    getOngoing();
  }, []);

  return (
    <div className="h-[90vh] p-4 text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
      </header>

      <div className="flex justify-end mb-6 space-x-4">
        <button
          className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={() => navigate("/addUser")}
        >
          Add User
        </button>
        <button
          className="px-4 py-2 font-semibold text-white transition bg-green-600 rounded-md hover:bg-green-700"
          onClick={() => navigate("/addTask")}
        >
          Add Task
        </button>
      </div>

      <section className="space-y-4">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Ongoing Tasks
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(({ _id, title, description, assignedTo, dueDate }) => (
            <Link to={`/task/${_id}`} key={_id}>
              <TaskCard
                title={title}
                description={description}
                users={assignedTo}
                dueDate={dueDate}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
