import { RequestWithFiles } from "#/middlewares/fileParser";
import Chat from "#/models/Chat";
import Task from "#/models/Task";
import { RequestHandler } from "express";
import { isValidObjectId, Types } from "mongoose";

interface CreateTaskRequest extends RequestWithFiles {
  body: {
    title: string;
    description: string;
    dueDate: Date;
    assignedTo: string;
  };
}
export const createTask: RequestHandler = async (
  req: CreateTaskRequest,
  res
) => {
  const { title, description, dueDate, assignedTo } = req.body;

  const newTask = new Task({
    title,
    description,
    dueDate,
  });
  const newChat = await Chat.create({ task: newTask._id, message: [] });
  newTask.assignedTo = JSON.parse(assignedTo);
  newTask.chat = newChat._id;
  await newTask.save();

  res.status(201).json({
    message: "Task Created Successfully",
  });
};

export const updateTask: RequestHandler = async (
  req: CreateTaskRequest,
  res
) => {
  const { title, description, dueDate } = req.body;
  const { taskId } = req.params;

  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    { title, description, dueDate }
  );
  if (!task) return res.status(404).json({ error: "Task Not Found" });

  await task.save();

  res.status(201).json({
    message: "Task Updated Successfully",
  });
};

export const markTaskAsCompleted: RequestHandler = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    { status: "completed" }
  );
  if (!task) return res.status(404).json({ error: "Task Not Found" });

  await task.save();

  res.status(201).json({
    message: "Task Completed Successfully",
  });
};
export const getTaskInfo: RequestHandler = async (req, res) => {
  const { taskId } = req.params;

  if (!isValidObjectId(taskId))
    return res.status(403).json({ error: "Invalid request!" });

  const task = await Task.findById(taskId)
    .populate({
      path: "assignedTo",
      select: "name avatar.url department",
    })
    .populate({
      path: "chat",
      populate: {
        path: "messages.user",
        model: "User",
        select: "name avatar.url department",
      },
    });

  if (!task) {
    return res.status(404).json({ error: "Task not found!" });
  }

  res.status(200).json({ task });
};
export const deleteTask: RequestHandler = async (req, res) => {
  const { taskId } = req.params;

  if (!isValidObjectId(taskId))
    return res.status(403).json({ error: "Invalid request!" });

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found!" });
  }

  await Task.findByIdAndDelete(taskId);
  await Chat.findOneAndDelete({ task: taskId });

  res.status(200).json({ message: "Task Deleted Successfully" });
};

export const getOngoingTasks: RequestHandler = async (req, res) => {
  // Fetch all tasks with status "ongoing"
  const tasks = await Task.find({ status: "ongoing" })
    .populate({
      path: "assignedTo",
      select: "name department avatar.url", // Select only the fields we need
    })
    .exec();

  res.status(200).json({ tasks });
};

export const getOngoingTasksUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const id = new Types.ObjectId(userId);
  if (!isValidObjectId(userId))
    return res.status(422).json({ error: "Invalid Object Id" });
  const tasks = await Task.find({
    status: "ongoing",
    assignedTo: { $in: [id] },
  })
    .populate({
      path: "assignedTo",
      select: "name department avatar.url", // Select only the fields we need
    })
    .exec();

  res.status(200).json({ tasks });
};

export const getAllTasks: RequestHandler = async (req, res) => {
  // Fetch all tasks with status "ongoing"
  const tasks = await Task.find({});

  res.status(200).json({ tasks });
};
