import User, { UserDocument } from "#/models/User";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { JWT_SECRET } from "#/utils/envs";
import { departments } from "#/utils/department";

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });
  if (!user)
    return res
      .status(403)
      .json({ error: "The email and password do not match." });

  const matched = await user.comparePassword(password);
  if (!matched)
    return res
      .status(403)
      .json({ error: "The email and password do not match." });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  await user.save();

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar?.url,
      department: user.department,
      token,
    },
  });
};

export const sendProfile: RequestHandler = (req, res) => {
  res.json({ user: req.user });
};

export const getAllUserName: RequestHandler = async (req, res) => {
  const users = await User.find().select("name");

  res.status(200).json({ users });
};
export const getAllUser: RequestHandler = async (req, res) => {
  // Fetch all users from the database
  // Fetch all users from the database
  const users = await User.find().exec();

  // Map users to include only the required fields
  const userDetails = users.map((user) => ({
    id: user._id.toString(), // Convert ObjectId to string
    name: user.name,
    department: user.department,
    avatar: user.avatar,
  }));

  // Sort users by their names in ascending order
  const sortedUsers = userDetails.sort((a, b) => a.name.localeCompare(b.name));

  res.status(200).json({ users: sortedUsers });
};
