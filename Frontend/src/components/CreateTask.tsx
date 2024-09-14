import Container from "./Container";
import { useNotification } from "@hooks/index";
import { useNavigate } from "react-router";
import { useState } from "react";
import TaskForm, { TaskDataTypes } from "./form/TaskForm";
import { createTask } from "@api/task";

const validate = (blogData: TaskDataTypes) => {
  const { title, description, dueDate } = blogData;
  if (!title) return { ok: false, error: "Name is Missing" };
  if (title.length < 5) return { ok: false, error: "Invalid Title" };
  if (!dueDate) return { ok: false, error: "Avatar is Missing" };
  if (!description) return { ok: false, error: "Email is Missing" };
  return { ok: true };
};

export default function CreateTask() {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();
  const handleUpload = async (TaskData: TaskDataTypes) => {
    setBusy(true);
    const { ok, error: err } = validate(TaskData);
    if (!ok && err) {
      setBusy(false);
      return updateNotification("error", err);
    }

    const finalAssign = JSON.stringify(TaskData["assignedTo"]);

    const { error, message } = await createTask({
      ...TaskData,
      assignedTo: finalAssign,
    });
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    return navigate("/");
  };
  return (
    <Container>
      <TaskForm onSubmit={handleUpload} busy={busy} />
    </Container>
  );
}
