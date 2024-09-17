import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  navigate("/signin");

  return <></>;
}
