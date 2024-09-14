import Container from "./Container";
import { useNotification } from "@hooks/index";
import { useNavigate } from "react-router";
import { useState } from "react";
import UserForm, { UserDataTypes } from "./form/UserForm";
import { createUser } from "@api/admin";

const validate = (blogData: UserDataTypes) => {
  const { name, email, avatar, department } = blogData;
  if (!name) return { ok: false, error: "Name is Missing" };
  if (name.length < 5) return { ok: false, error: "Invalid Title" };
  if (!avatar) return { ok: false, error: "Avatar is Missing" };
  if (!department) return { ok: false, error: "Department is Missing" };
  if (!email) return { ok: false, error: "Email is Missing" };
  return { ok: true };
};

export default function CreateUser() {
  const { updateNotification } = useNotification();
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();
  const handleUpload = async (UserData: UserDataTypes) => {
    setBusy(true);
    const { ok, error: err } = validate(UserData);
    if (!ok && err) {
      setBusy(false);
      return updateNotification("error", err);
    }
    const formData = new FormData();

    for (let key in UserData) {
      if (UserData[key as keyof UserDataTypes]) {
        formData.append(key, UserData[key as keyof UserDataTypes] as any);
      }
    }
    console.log(UserData);
    const { error, message } = await createUser(formData);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    return navigate("/");
  };
  return (
    <Container>
      <UserForm onSubmit={handleUpload} busy={busy} />
    </Container>
  );
}
