import { createUser } from "#/controllers/admin";
import { isAdmin, isAuth } from "#/middlewares/auth";
import fileParser from "#/middlewares/fileParser";
import { validate } from "#/middlewares/validator";
import { CreateUserSchema } from "#/utils/validationSchema";
import { Router } from "express";

const routes = Router();

routes.post(
  "/create",
  isAuth,
  isAdmin,
  fileParser,
  validate(CreateUserSchema),
  createUser
);

export default routes;
