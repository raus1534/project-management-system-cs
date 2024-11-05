import { getAllTasks } from "@api/task";
import Title from "@components/form/Title";
import { useNotification } from "@hooks/index";
import { useEffect, useState } from "react";

export default function Task() {
  const [tasks, setTasks] = useState<any[]>([]);
  const { updateNotification } = useNotification();

  const getOngoing = async () => {
    const { tasks, error } = await getAllTasks();
    if (error) return updateNotification("error", error);
    setTasks([...tasks]);
  };

  useEffect(() => {
    getOngoing();
  }, []);

  return (
    <div className="p-4 space-y-6 bg-gray-100 dark:text-white text-gray-900 shadow-md dark:bg-gray-900 h-[90vh]">
      <Title>Tasks</Title>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="text-white bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-left">#</th>
              <th className="px-4 py-3 text-sm font-medium text-left">Title</th>
              <th className="px-4 py-3 text-sm font-medium text-left">
                Description
              </th>
              <th className="px-4 py-3 text-sm font-medium text-left">
                Due Date
              </th>
              <th className="px-4 py-3 text-sm font-medium text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map(({ title, description, dueDate, status }, index) => (
              <tr
                key={index}
                className="transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2 text-sm font-medium">{index + 1}</td>
                <td className="px-4 py-2 text-sm">{title}</td>
                <td className="px-4 py-2 text-sm">{description}</td>
                <td className="px-4 py-2 text-sm">{dueDate.split("T")[0]}</td>
                <td className="px-4 py-2 text-sm">{status}</td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
