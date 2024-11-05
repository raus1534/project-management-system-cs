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

  // Assuming you have a way to determine the current theme (e.g., a context or state)
  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <div className="flex flex-col h-[90vh] p-4 bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-center flex-grow">
          <div className="relative flex flex-wrap w-2/5 space-x-4 space-y-3">
            <TaskCard
              title={task?.title}
              description={task?.description}
              users={task?.assignedTo}
              dueDate={task?.dueDate}
            />
            {profile?.role === "admin" && (
              <button
                className={`align-middle select-none font-bold text-xs py-3 px-6 rounded-lg transition-all shadow-md ${
                  task?.status === "ongoing"
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "bg-gray-500 text-white cursor-not-allowed"
                }`}
                type="button"
                onClick={handleTaskCompleted}
                disabled={task?.status !== "ongoing"}
              >
                {task?.status === "ongoing" ? "Mark as Completed" : "Completed"}
              </button>
            )}
          </div>
          <div className="flex flex-col items-center justify-end w-3/5 h-full overflow-y-auto">
            <div className="w-3/4">
              {task?.chat?.messages?.length === 0 ? (
                <div className="flex justify-center text-gray-500">
                  No messages available.
                </div>
              ) : (
                task?.chat?.messages?.map(
                  (
                    { text, user }: { text: string; user: any },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className={`flex flex-col items-start mb-4 transition-opacity duration-300 ${
                        index === task.chat.messages.length - 1
                          ? "animate-fade-in"
                          : ""
                      }`}
                    >
                      <div className="text-xs font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="relative w-full p-3 mt-1 bg-white rounded-lg shadow-md">
                        <p className="text-sm text-gray-800">{text}</p>
                      </div>
                    </div>
                  )
                )
              )}
            </div>

            <div className="flex items-center w-4/5 gap-2 p-2 mt-2 border rounded border-gray-900/10 bg-gray-900/5">
              <Textarea
                rows={1}
                resize={true}
                placeholder="Your Message"
                className={`flex-grow min-h-full border-0 focus:border-transparent ${
                  isDarkMode
                    ? "text-white bg-gray-800"
                    : "text-gray-900 bg-white"
                }`}
                value={chat}
                onChange={handleChat}
              />
              <IconButton
                variant="text"
                className="text-blue-500 rounded-full"
                onClick={sendChat}
                disabled={!chat.trim()}
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
  );
}
