import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/envs";
import User from "../models/User";

export const isAuth: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split("PMS ")[1];
  if (!token) return res.status(403).json({ error: "Unauthorized request!" });

  const payload = verify(token, JWT_SECRET) as JwtPayload;
  const id = payload.userId;

  const user = await User.findOne({ _id: id, tokens: token });
  if (!user) return res.status(403).json({ error: "Unauthorized request!" });

  req.user = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user?.avatar?.url,
    department: user.department,
  };

  next();
};

export const isAdmin: RequestHandler = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Only Authorized By Admin" });

  next();
};
