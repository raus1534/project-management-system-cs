import express from "express";
import "dotenv/config";
import "express-async-errors";
import "./db";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const allowedOrigins: string[] = [
  "https://pmscs.vercel.app",
  "http://localhost:5173",
];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

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
