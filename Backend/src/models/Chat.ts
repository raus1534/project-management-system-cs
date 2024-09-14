import { Model, model, ObjectId, Schema } from "mongoose";

export interface ChatDocument {
  _id: ObjectId;
  task: ObjectId;
  messages: { user: ObjectId; text: string }[];
}

const blogSchema = new Schema<ChatDocument>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    messages: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: String,
        time: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

export default model("Chat", blogSchema) as Model<ChatDocument>;
