import {
  getAllUser,
  getAllUserName,
  sendProfile,
  signIn,
} from "#/controllers/auth";
import { isAdmin, isAuth } from "#/middlewares/auth";
import { validate } from "#/middlewares/validator";
import { SignInValidationSchema } from "#/utils/validationSchema";
import { Router } from "express";

const routes = Router();

routes.get("/is-auth", isAuth, sendProfile);
routes.get("/getAllUser", isAuth, getAllUser);
routes.get("/getAllUserName", isAuth, isAdmin, getAllUserName);
routes.post("/sign-in", validate(SignInValidationSchema), signIn);

export default routes;
