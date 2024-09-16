import { RequestWithFiles } from "../middlewares/fileParser";
import User from "../models/User";
import { RequestHandler } from "express";
import formidable from "formidable";
import cloudinary from "../cloud";
import { generatePassword } from "../utils/helper";
import { sendWelcomeMessage } from "../utils/mail";

export interface CreateUser extends RequestWithFiles {
  body: {
    name: string;
    email: string;
    password: string;
    department: string;
  };
}

export const createUser: RequestHandler = async (req: CreateUser, res) => {
  const { email, name, department } = req.body;
  const avatar = req.files?.avatar as formidable.File;

  if (!avatar) return res.status(422).json({ error: "Avatar is missing!" });

  const isExistingUser = await User.findOne({ email });
  if (isExistingUser)
    return res.status(403).json({
      error: "The email you entered is already associated with an account.",
    });
  const password = generatePassword();

  const user = new User({ name, email, password, department });
  const avatarRes = await cloudinary.uploader.upload(avatar.filepath, {
    width: 300,
    height: 300,
    crop: "thumb",
    gravity: "face",
    folder: "CSPMS/Users",
  });
  user.avatar = {
    url: avatarRes.secure_url,
    publicId: avatarRes.public_id,
  };

  await user.save();

  sendWelcomeMessage({ name, email, password });

  res.status(201).json({
    message: "Account Created Successfully",
  });
};
