interface Props {
  children: import("react").ReactNode;
}

export default function FormContainer({ children }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center text-gray-900 bg-white dark:bg-gray-900 dark:text-white -z-10">
      {children}
    </div>
  );
}
