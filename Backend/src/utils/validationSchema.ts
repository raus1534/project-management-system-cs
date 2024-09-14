import * as yup from "yup";
import { departments } from "./department";

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing!")
    .min(3, "Name is too short!")
    .max(20, "Name is too long!"),
  email: yup.string().required("Email is missing!").email("Invalid email id!"),
  department: yup
    .string()
    .oneOf(departments, "Invalid Department!")
    .required("Department is missing!"),
});

export const SignInValidationSchema = yup.object().shape({
  email: yup.string().required("Email is missing!").email("Invalid email id!"),
  password: yup.string().trim().required("Password is missing!"),
});

export const CreateTaskSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Title is missing!")
    .min(5, "Title is too short!"),
  description: yup.string().required("Description is missing!"),
  dueDate: yup.date().required("DueDate is missing!"),
});

export const AddChatSchema = yup.object().shape({
  message: yup
    .string()
    .trim()
    .required("Chat is missing!")
    .min(2, "Chat is too short!"),
});
