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
    console.log(users);
  }, []);
  return (
    <div className="flex flex-col justify-center p-2 border-l-2 border-r border-black w-72 ">
      <div className="flex flex-col items-center h-[95%] space-y-4">
        <List className="">
          {users.map(({ name, avatar, department }) => {
            return (
              <ListItem className="border-b-2 border-primary">
                <ListItemPrefix>
                  <Avatar variant="circular" alt="candice" src={avatar?.url} />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {department}
                  </Typography>
                </div>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}
