import { useEffect, useState } from "react";
import SubmitBtn from "./SubmitBtn";
import { departments, departmentsTypes } from "@utils/department";
import { ImPencil } from "react-icons/im";
import { BiUpload } from "react-icons/bi";

export interface UserDataTypes {
  avatar: File | null;
  name: string;
  email: string;
  department: departmentsTypes;
}
interface Props {
  initialValue?: {
    name: string;
    department: departmentsTypes;
    email: string;
    avatar: any;
  };
  onSubmit: (blogData: UserDataTypes) => void;
  busy?: boolean;
}

export default function UserForm({ onSubmit, busy, initialValue }: Props) {
  const [userData, setUserData] = useState<UserDataTypes>({
    avatar: null,
    name: "",
    email: "",
    department: "Web Developer",
  });
  const [avatarForUi, setAvatarForUi] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === "avatar" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setAvatarForUi(URL.createObjectURL(e.target.files[0]));
      return setUserData({ ...userData, avatar: e.target.files[0] });
    }
    if (name === "name" || name === "email" || name === "department") {
      return setUserData({ ...userData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...userData });
  };

  useEffect(() => {
    if (initialValue) {
      const { name, email, department } = initialValue;
      setUserData({ name, email, department, avatar: null });
      setAvatarForUi(initialValue?.avatar.url);
    }
  }, [initialValue]);

  return (
    <form className="p-5 space-y-5" onSubmit={handleSubmit}>
      <div className="flex items-center space-x-4">
        <div className="relative inline-block mx-auto">
          <div className="flex items-center justify-center overflow-hidden text-xl font-semibold border-2 rounded-full w-28 h-28 border-primary">
            {avatarForUi ? (
              <img src={avatarForUi} className="w-28 h-28 " />
            ) : (
              <BiUpload />
            )}
          </div>

          <label
            className="absolute right-0 bg-white rounded-full top-2"
            htmlFor="avatar"
          >
            <input
              onChange={handleChange}
              name="avatar"
              type="file"
              id="avatar"
              hidden
              accept="image/*"
            />
            <ImPencil className="w-6 h-6 p-1 cursor-pointer" />
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse">
        <input
          id="name"
          name="name"
          type="text"
          className="w-full p-1 bg-transparent border-2 rounded outline-none dark:border-dark-subtle peer"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
        />
        <label
          htmlFor="name"
          className="self-start font-semibold dark:text-dark-subtle"
        >
          Name
        </label>
      </div>
      <div className="flex flex-col-reverse">
        <input
          id="email"
          name="email"
          type="text"
          className="w-full p-1 bg-transparent border-2 rounded outline-none dark:border-dark-subtle peer"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
        <label
          htmlFor="email"
          className="self-start font-semibold dark:text-dark-subtle"
        >
          Email
        </label>
      </div>
      <div className="flex flex-col-reverse">
        <select
          id="department"
          name="department"
          className="w-full p-1 bg-transparent border-2 rounded outline-none dark:border-dark-subtle peer"
          value={userData.department}
          onChange={handleChange}
        >
          <option value="">Select a department</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
        <label
          htmlFor="category"
          className="self-start font-semibold dark:text-dark-subtle"
        >
          Department
        </label>
      </div>

      <SubmitBtn submitValue={initialValue ? "Update" : "Post"} busy={busy} />
    </form>
  );
}
