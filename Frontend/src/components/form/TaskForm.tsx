import { useEffect, useState } from "react";
import SubmitBtn from "./SubmitBtn";
import { getUserNames } from "@api/auth";
import { Chip } from "@material-tailwind/react";

export interface TaskDataTypes {
  title: string;
  description: string;
  assignedTo: string[];
  dueDate: string;
}

interface Props {
  initialValue?: {
    title: string;
    description: string;
    assignedTo: string[];
    dueDate: "";
  };
  onSubmit: (blogData: TaskDataTypes) => void;
  busy?: boolean;
}

export default function TaskForm({ onSubmit, busy, initialValue }: Props) {
  const [taskData, setTaskData] = useState<TaskDataTypes>({
    title: "",
    description: "",
    assignedTo: [],
    dueDate: "",
  });
  const [userNames, setUserNames] = useState<any[]>([]);
  const [selectedUserNames, setSelectedUserNames] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>(""); // New state for selected user ID

  const AllUsers = async () => {
    const { users, error } = await getUserNames();
    if (error) return;
    setUserNames(users);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const _id = event.target.value;

    // Avoid duplicate selection
    if (_id && !selectedUserNames.find((user) => user._id === _id)) {
      const selectedOption = userNames.find((user) => user._id === _id);
      if (selectedOption) {
        setSelectedUserNames([
          ...selectedUserNames,
          { _id, name: selectedOption.name },
        ]);
      }
      setSelectedUserId(""); // Reset the selected user ID
    }
  };

  const handleUserRemove = (_id: string) => {
    setSelectedUserNames(selectedUserNames.filter((user) => user._id !== _id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const assignedTo = selectedUserNames.map(({ _id }) => _id);
    onSubmit({ ...taskData, assignedTo });
  };

  useEffect(() => {
    AllUsers();
    if (initialValue) {
      const { title, description, assignedTo, dueDate } = initialValue;
      setTaskData({ title, description, assignedTo, dueDate });
      // Set selected user names from assignedTo array
      setSelectedUserNames(
        assignedTo
          .map((id) => {
            const user = userNames.find((user) => user._id === id);
            return user ? { _id: user._id, name: user.name } : null;
          })
          .filter(Boolean)
      );
    }
  }, [initialValue, userNames]); // Ensure userNames is included to run this effect correctly

  return (
    <form
      className="h-[90vh] p-5 space-y-5 bg-white shadow-md dark:bg-gray-800"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label
          htmlFor="title"
          className="font-semibold text-gray-700 dark:text-white"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="p-2 mt-1 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter task title"
          value={taskData.title}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="font-semibold text-gray-700 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="p-2 mt-1 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter task description"
          value={taskData.description}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="users"
          className="font-semibold text-gray-700 dark:text-white"
        >
          Users
        </label>
        <select
          id="users"
          className="p-2 mt-1 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          onChange={handleUserSelect}
          value={selectedUserId} // Bind to selectedUserId state
        >
          <option value="" disabled>
            Select a user
          </option>
          {userNames.map(({ _id, name }, index) => (
            <option key={index} value={_id}>
              {name}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap mt-2">
          {selectedUserNames.map(({ _id, name }, index) => (
            <div
              key={index}
              className="mb-2 mr-2 cursor-pointer"
              onClick={() => handleUserRemove(_id)} // Handle removal on div click
            >
              <Chip value={name} className="text-white bg-blue-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="dueDate"
          className="font-semibold text-gray-700 dark:text-white"
        >
          Due Date
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          className="p-2 mt-1 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={taskData.dueDate}
          onChange={handleChange}
        />
      </div>

      <SubmitBtn submitValue={initialValue ? "Update" : "Post"} busy={busy} />
    </form>
  );
}
