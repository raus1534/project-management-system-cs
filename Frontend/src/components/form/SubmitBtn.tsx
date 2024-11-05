import { ImSpinner5 } from "react-icons/im";

interface Props {
  submitValue: string;
  busy?: boolean;
  onClick?: any;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
}
export default function SubmitBtn({
  submitValue,
  busy,
  onClick,
  type,
  className,
}: Props) {
  return (
    <button
      type={type || "submit"}
      onClick={onClick}
      value={submitValue}
      className={
        "flex items-center justify-center w-full h-10 p-1 text-lg font-semibold  transition rounded cursor-pointer dark:bg-white dark:text-gray-900 text-white bg-gray-900 hover:bg-opacity-90 " +
        className
      }
    >
      {busy ? <ImSpinner5 className="animate-spin" /> : submitValue}
    </button>
  );
}
