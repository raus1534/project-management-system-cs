import { getTaskInfo, markUpdated } from "@api/task";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TaskCard from "./TaskCard";
import { IconButton, Textarea } from "@material-tailwind/react";
import { sendChats } from "@api/chat";
import { useAuth, useNotification } from "@hooks/index";
import { AuthContextType } from "@context/AuthProvider";

export default function TaskInfo() {
  const [chat, setChat] = useState("");
  const [task, setTask] = useState<any>();
  const { updateNotification } = useNotification();
  const { taskId } = useParams();

  const { authInfo } = useAuth() as AuthContextType;
  const { profile } = authInfo;

  const getTaskInfos = async () => {
    const { task, error } = await getTaskInfo(taskId!);
    if (error && !task) return;
    setTask(task);
  };
  const handleChat = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChat(event.target.value);
  };
  const sendChat = async () => {
    const { ok, error } = await sendChats(task?.chat?._id, chat);
    if (!ok || error) return;
    setChat("");
    getTaskInfos();
  };

  const handleTaskCompleted = async () => {
    const { message, error } = await markUpdated(taskId!);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    getTaskInfos();
  };

  useEffect(() => {
    getTaskInfos();
  }, [taskId]);
  return (
    <div className="h-[78vh]">
      <div className="flex flex-col justify-between px-3">
        <div className="flex items-center justify-center h-[78vh]">
          <div className="relative flex flex-wrap w-2/5 space-x-3 space-y-3">
            <TaskCard
              title={task?.title}
              description={task?.description}
              users={task?.assignedTo}
              dueDate={task?.dueDate}
            />
            {profile?.role === "admin" ? (
              task?.status === "ongoing" && profile?.role === "admin" ? (
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                  onClick={handleTaskCompleted}
                >
                  Mark as Completed
                </button>
              ) : (
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  type="button"
                  disabled
                >
                  Completed
                </button>
              )
            ) : null}
          </div>
          <div className="flex flex-col items-center justify-end w-3/5 h-full overflow-scroll">
            {task?.chat?.messages?.map(
              ({ text, user }: { text: string; user: any }) => {
                return (
                  <div className="flex flex-col items-start w-3/4 mb-4">
                    <div className="text-xs font-medium text-gray-900">
                      {user.name}
                    </div>
                    <textarea
                      key={text}
                      className=" w-full peer min-h-[50px] resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-primary outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                      readOnly
                    >
                      {text}
                    </textarea>
                  </div>
                );
              }
            )}

            <div className="flex w-4/5 mt-2 flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
              <Textarea
                rows={1}
                resize={true}
                placeholder="Your Message"
                className="min-h-full !border-0 focus:border-transparent"
                containerProps={{
                  className: "grid h-full",
                }}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={chat}
                onChange={handleChat}
              />
              <div>
                <IconButton
                  variant="text"
                  className="rounded-full"
                  onClick={sendChat}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
