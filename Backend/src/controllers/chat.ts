import Chat from "../models/Chat";
import { RequestHandler } from "express";

interface AddChatRequest {
  body: {
    message: string;
  };
}

export const addChat: RequestHandler = async (req, res) => {
  const { message } = req.body as { message: string };
  const { chatId } = req.params;
  const user = req.user.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return res.status(404).json({ error: "Chat Not Found" });

  chat.messages.push({
    user,
    text: message,
  });
  await chat.save();

  res.status(201).json({
    ok: true,
  });
};
