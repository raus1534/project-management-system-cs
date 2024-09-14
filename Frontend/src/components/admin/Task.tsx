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
    <div className="p-1 space-y-4">
      <Title>Tasks</Title>
      <div>
        <table className="w-full overflow-hidden rounded-lg">
          <thead className="rounded-xl">
            <tr className="text-gray-500 bg-stone-800">
              <td className="px-4 py-3">Title</td>
              {["Description", "Due Date", "Status", ""].map((td) => {
                return <td key={td}>{td}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {tasks.map(({ title, description, dueDate, status }, index) => {
              return (
                <tr
                  key={index}
                  className="h-16 text-base font-semibold border-b-2 border-black"
                >
                  <td className="px-5">{index + 1 + ". " + title}</td>
                  <td>{description}</td>
                  <td className="text-xs flex-nowrap">
                    {dueDate.split("T")[0]}
                  </td>
                  <td>{status}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
