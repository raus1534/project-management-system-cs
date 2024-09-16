import { addChat } from "../controllers/chat";
import { isAuth } from "../middlewares/auth";
import { validate } from "../middlewares/validator";
import { AddChatSchema } from "../utils/validationSchema";
import { Router } from "express";

const routes = Router();

routes.patch("/addChat/:chatId", isAuth, validate(AddChatSchema), addChat);

export default routes;
