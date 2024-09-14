import { handleAxiosError } from "@utils/helper";
import client from "./client";

export const getIsAuth = async (token: string) => {
  try {
    const { data } = await client.get("/auth/is-auth", {
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
export const getUserNames = async () => {
  try {
    const token = localStorage.getItem("auth-token");
    const { data } = await client.get("/auth/getAllUserName", {
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
export const getUsers = async () => {
  try {
    const token = localStorage.getItem("auth-token");
    const { data } = await client.get("/auth/getAllUser", {
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

export const signInUser = async (userInfo: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await client.post("/auth/sign-in", userInfo);
    return data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
