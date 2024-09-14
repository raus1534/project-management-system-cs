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
    <Card className="max-w-[24rem] overflow-hidden shadow-xl">
      <CardBody>
        <Typography variant="h5" color="black">
          {title}
        </Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {users?.map(({ _id, name, department, avatar }) => {
            return (
              <Tooltip key={_id} content={name + " | " + department}>
                <Avatar
                  size="sm"
                  variant="circular"
                  alt="natali craig"
                  src={avatar?.url}
                  className="border-2 border-white hover:z-10"
                />
              </Tooltip>
            );
          })}
        </div>
        <Typography className="font-normal">{formatDate(dueDate)}</Typography>
      </CardFooter>
    </Card>
  );
}
