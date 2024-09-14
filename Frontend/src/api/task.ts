import { handleAxiosError } from "@utils/helper";
import client from "./client";

export const getOngoingTask = async () => {
  try {
    const token = localStorage.getItem("auth-token");
    const { data } = await client.get("/task/getOngoingTask", {
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
export const getOngoingTaskUser = async (userId: string) => {
  try {
    const token = localStorage.getItem("auth-token");
    const { data } = await client.get("/task/getOngoingUser/" + userId, {
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
export const markUpdated = async (taskId: string) => {
  try {
    const token = localStorage.getItem("auth-token");
    const { data } = await client.patch(
      "/task/markTaskAsCompleted/" + taskId,
      {},
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

export const getAllTasks = async () => {
  try {
    const token = localStorage.getItem("auth-token");
    const { data } = await client.get("/task/getAllTask", {
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

export const createTask = async (taskInfo: any) => {
  try {
    const token = localStorage.getItem("auth-token");
    const { data } = await client.post("/task/createTask", taskInfo, {
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
export const getTaskInfo = async (taskId: string) => {
  try {
    const token = localStorage.getItem("auth-token");
    const { data } = await client.get("/task/taskInfo/" + taskId, {
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
