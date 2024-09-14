import { useEffect, useState } from "react";
import { commonModalClasses } from "../../utils/Theme";
import Container from "../Container";
import InputField from "../form/InputField";
import SubmitBtn from "../form/SubmitBtn";
import Title from "../form/Title";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import FormContainer from "@components/form/FormContainer";
import { AuthContextType } from "@context/AuthProvider";

const validateUserDetail = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email.trim()) return { ok: false, error: "Invalid Email" };

  if (!isValidEmail(email)) return { ok: false, error: "Invalid Email" };

  if (!password.trim()) return { ok: false, error: "Invalid Password" };

  return { ok: true };
};

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInfo;
  const { updateNotification } = useNotification();
  const { authInfo, handleLogin } = useAuth() as AuthContextType;
  const { isLoggedIn } = authInfo;
  const { isPending } = authInfo;
  const navigate = useNavigate();

  const handleOnChange = ({ target }: { target: HTMLInputElement }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { ok, error } = validateUserDetail({ email, password });
    if (!ok && error) return updateNotification("error", error);
    handleLogin(email, password);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/", { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + "w-72"} onSubmit={handleSubmit}>
          <Title>Sign In</Title>
          <InputField
            label="Email"
            placeholder="youremail@gmail.com"
            name="email"
            value={email}
            onChange={handleOnChange}
          />
          <InputField
            label="Password"
            placeholder="********"
            name="password"
            value={password}
            onChange={handleOnChange}
          />
          <SubmitBtn submitValue="Sign In" busy={isPending} />
        </form>
      </Container>
    </FormContainer>
  );
}
