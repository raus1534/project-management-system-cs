import { departments, departmentsTypes } from "#/utils/department";
import { compare, hash } from "bcrypt";
import { Model, model, ObjectId, Schema } from "mongoose";

// interface (typescript)
export interface UserDocument {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  department: departmentsTypes;
  avatar?: { url: string; publicId: string };
}
interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      url: String,
      publicId: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    department: {
      type: String,
      required: true,
      enum: departments,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // hash the password
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await compare(password, this.password);
  return result;
};

export default model("User", userSchema) as Model<UserDocument, {}, Methods>;
