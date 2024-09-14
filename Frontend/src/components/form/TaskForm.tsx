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

  const AllUsers = async () => {
    const { users, error } = await getUserNames();
    if (error) return;
    setUserNames([...users]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    return setTaskData({ ...taskData, [name]: value });
  };
  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const _id = selectedOption.value;
    const name = selectedOption.text;
    setSelectedUserNames([...selectedUserNames, { _id, name }]);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const assignedTo = selectedUserNames.map(({ _id }) => {
      return _id;
    });
    onSubmit({ ...taskData, assignedTo });
  };

  useEffect(() => {
    AllUsers();
    if (initialValue) {
      const { title, description, assignedTo, dueDate } = initialValue;
      setTaskData({ title, description, assignedTo, dueDate });
    }
  }, [initialValue]);

  return (
    <form className="p-5 space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col-reverse">
        <input
          id="title"
          name="title"
          type="text"
          className="w-full p-1 bg-transparent border-2 rounded outline-none dark:border-dark-subtle peer"
          placeholder="Title"
          value={taskData.title}
          onChange={handleChange}
        />
        <label
          htmlFor="title"
          className="self-start font-semibold dark:text-dark-subtle"
        >
          Title
        </label>
      </div>
      <div className="flex flex-col-reverse">
        <input
          id="description"
          name="description"
          type="text"
          className="w-full p-1 bg-transparent border-2 rounded outline-none dark:border-dark-subtle peer"
          placeholder="Description"
          value={taskData.description}
          onChange={handleChange}
        />
        <label
          htmlFor="description"
          className="self-start font-semibold dark:text-dark-subtle"
        >
          Description
        </label>
      </div>
      <div className="relative flex flex-col-reverse">
        <div className="absolute w-11/12 h-8 p-1 space-x-2 bg-white outline-none top-5">
          {selectedUserNames.map(({ name }) => {
            return (
              <Chip
                value={name}
                className="inline-flex items-center px-3 py-1 text-white rounded-full bg-primary"
              />
            );
          })}
        </div>
        <select
          id="department"
          className="w-full p-1 bg-transparent border-2 rounded outline-none dark:border-dark-subtle peer"
          onChange={handleUserSelect}
        >
          <option value=""></option>
          {userNames.map(({ _id, name }, index) => (
            <option key={index} value={_id}>
              {name}
            </option>
          ))}
        </select>
        <label
          htmlFor="category"
          className="self-start font-semibold dark:text-dark-subtle"
        >
          Users
        </label>
      </div>
      <div className="flex flex-col-reverse">
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          className="w-full p-1 bg-transparent border-2 rounded outline-none dark:border-dark-subtle peer"
          placeholder="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
        />
        <label
          htmlFor="description"
          className="self-start font-semibold dark:text-dark-subtle"
        >
          Due Date
        </label>
      </div>

      <SubmitBtn submitValue={initialValue ? "Update" : "Post"} busy={busy} />
    </form>
  );
}
