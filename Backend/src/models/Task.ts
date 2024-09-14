import { Model, model, ObjectId, Schema } from "mongoose";

export interface TaskDocument {
  _id: ObjectId;
  title: string;
  description: string;
  assignedTo: ObjectId[];
  chat: ObjectId;
  dueDate: Date;
  status: "ongoing" | "completed";
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "ongoing",
      enum: ["ongoing", "completed"],
    },
  },
  { timestamps: true }
);

export default model("Task", taskSchema) as Model<TaskDocument>;
