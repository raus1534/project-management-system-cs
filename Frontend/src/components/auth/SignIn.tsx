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
import Navbar from "@components/Navbar";

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
  const { isLoggedIn, isPending } = authInfo;
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
    <div className="bg-red-500">
      <Navbar />
      <FormContainer>
        <Container>
          <form
            className={`${commonModalClasses} w-80 p-6 space-y-4 dark:bg-gray-800 dark:text-white bg-white text-gray-900`}
            onSubmit={handleSubmit}
          >
            <Title>Sign In</Title>
            <InputField
              label="Email"
              placeholder="youremail@gmail.com"
              name="email"
              value={email}
              onChange={handleOnChange}
              aria-label="Email"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
            />
            <InputField
              label="Password"
              placeholder="********"
              name="password"
              type="password"
              value={password}
              onChange={handleOnChange}
              aria-label="Password"
              className="w-full p-2 text-gray-900 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            <SubmitBtn
              submitValue="Sign In"
              busy={isPending}
              className="w-full mt-4"
            />
          </form>
        </Container>
      </FormContainer>
    </div>
  );
}
