import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: any;
        name: string;
        email: string;
        role: "admin" | "user";
        department: string;
        avatar?: string;
      };
    }
  }
}
