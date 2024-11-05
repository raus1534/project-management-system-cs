import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { formatDate } from "@utils/helper";

interface Props {
  title: string;
  description: string;
  users: {
    _id: string;
    name: string;
    department: string;
    avatar: { url: string };
  }[];
  dueDate: string;
}

export default function TaskCard({
  title,
  description,
  users,
  dueDate,
}: Props) {
  return (
    <Card className="max-w-[24rem] p-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800 bg-white rounded-lg shadow-md">
      <CardBody>
        {/* Title with Accent Border */}
        <div className="pl-3 mb-4 border-l-4 border-blue-500">
          <Typography variant="h5" className="font-semibold dark:text-gray-100">
            {title}
          </Typography>
        </div>

        {/* Task Description */}
        <Typography
          variant="lead"
          color="gray"
          className="mt-2 mb-4 dark:text-gray-300"
        >
          {description}
        </Typography>
      </CardBody>

      <CardFooter className="flex items-center justify-between">
        {/* Avatars of Assigned Users */}
        <div className="flex -space-x-2">
          {users?.map(({ _id, name, department, avatar }) => (
            <Tooltip key={_id} content={`${name} | ${department}`}>
              <Avatar
                size="sm"
                variant="circular"
                src={avatar?.url}
                className="transition-transform duration-200 border-2 border-white dark:border-gray-700 hover:scale-110 hover:z-10"
                alt={name}
              />
            </Tooltip>
          ))}
        </div>

        {/* Due Date */}
        <div className="flex items-center">
          <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {formatDate(dueDate)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
