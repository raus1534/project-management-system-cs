import { handleAxiosError } from "@utils/helper";
import client from "./client";

export const createUser = async (userInfo: any) => {
  try {
    const token = localStorage.getItem("auth-token");
    const { data } = await client.post("/admin/create", userInfo, {
      headers: {
        authorization: "PMS " + token,
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
