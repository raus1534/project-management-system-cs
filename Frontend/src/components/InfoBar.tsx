import { getUsers } from "@api/auth";
import {
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function InfoBar() {
  const [users, setUsers] = useState<any[]>([]);

  const getUser = async () => {
    const { users, error } = await getUsers();
    if (error) return;

    setUsers([...users]);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col h-[90vh] overflow-scroll px-6 py-4 bg-white border-l border-gray-300 shadow-lg dark:border-gray-700 w-80 dark:bg-gray-900">
      <Typography
        variant="h5"
        className="mb-4 font-semibold text-gray-800 dark:text-gray-100"
      >
        Team Members
      </Typography>
      <List className="space-y-2">
        {users.map(({ name, avatar, department }) => (
          <ListItem className="flex items-center px-4 py-3 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt={name}
                src={avatar?.url}
                className="border border-gray-200 dark:border-gray-700"
                size="lg"
              />
            </ListItemPrefix>
            <div className="ml-4">
              <Typography
                variant="h6"
                className="font-medium dark:text-gray-100"
              >
                {name}
              </Typography>
              <Typography
                variant="small"
                className="text-sm dark:text-gray-400"
              >
                {department}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
