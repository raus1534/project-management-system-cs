import { createUser } from "#/controllers/admin";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getOngoingTasks,
  getOngoingTasksUser,
  getTaskInfo,
  markTaskAsCompleted,
  updateTask,
} from "#/controllers/task";
import { isAdmin, isAuth } from "#/middlewares/auth";
import { validate } from "#/middlewares/validator";
import { CreateTaskSchema } from "#/utils/validationSchema";
import { Router } from "express";

const routes = Router();

routes.post(
  "/createTask",
  isAuth,
  isAdmin,
  validate(CreateTaskSchema),
  createTask
);
routes.patch(
  "/updateTask/:taskId",
  isAuth,
  isAdmin,
  validate(CreateTaskSchema),
  updateTask
);
routes.patch(
  "/markTaskAsCompleted/:taskId",
  isAuth,
  isAdmin,
  markTaskAsCompleted
);

routes.get("/getOngoingTask", isAuth, isAdmin, getOngoingTasks);
routes.get("/getOngoingUser/:userId", isAuth, getOngoingTasksUser);
routes.get("/getAllTask", isAuth, isAdmin, getAllTasks);
routes.get("/taskInfo/:taskId", isAuth, getTaskInfo);
routes.delete("/deleteTask/:taskId", isAuth, isAdmin, deleteTask);

export default routes;
