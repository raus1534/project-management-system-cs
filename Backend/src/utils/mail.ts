import nodemailer from "nodemailer";
import path from "path";
import {
  MAILTRAP_PASS,
  MAILTRAP_USER,
  VERIFICATION_EMAIL,
} from "../utils/envs";
import { generateTemplate } from "./mailTemplate";

const generateMailTransporter = () => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });

  return transport;
};

interface Profile {
  name: string;
  email: string;
  password: string;
}

export const sendWelcomeMessage = async (profile: Profile) => {
  const transport = generateMailTransporter();

  const { name, email, password } = profile;

  const welcomeMessage = `Hello ${name}, welcome to Rayu Company! As a verified user, you'll have access to exclusive features. Please use the provided password to access your account.`;

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: "Welcome message",
    html: generateTemplate({
      title: "Welcome to Rayu Company",
      message: welcomeMessage,
      logo: "cid:logo",
      banner: "cid:welcome",
      link: "..",
      btnTitle: password,
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../public/logo.png"),
        cid: "logo",
      },
      {
        filename: "welcome.png",
        path: path.join(__dirname, "../public/welcome.jpg"),
        cid: "welcome",
      },
    ],
  });
};
