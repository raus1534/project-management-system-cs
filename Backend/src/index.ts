import express from "express";
import "dotenv/config";
import "express-async-errors";
import "./db";
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

import adminRouter from "./routes/admin";
import authRouter from "./routes/auth";
import taskRouter from "./routes/task";
import chatRouter from "./routes/chat";
import { errorHandler } from "./middlewares/error";

app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/chat", chatRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Listening in PORT:" + PORT);
});
