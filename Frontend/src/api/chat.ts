import { handleAxiosError } from "@utils/helper";
import client from "./client";

export const sendChats = async (chatId: string, message: string) => {
  try {
    const token = localStorage.getItem("auth-token");
    const { data } = await client.patch(
      "/chat/addChat/" + chatId,
      { message },
      {
        headers: {
          authorization: "PMS " + token,
          accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
