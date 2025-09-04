import { notification } from "antd";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { HTTP_STATUS, ROUTES } from "../constants";
import { Params } from "../types";
import { getToken } from "../utils";
import { ErrorMessage } from "../utils/toast";
import { AntdNotification } from "../utils/toast/ToastNotification";

let isRedirecting = false;

async function Get<T>(url: string, params?: Params, headers?: Record<string, string>): Promise<T> {
  const token = getToken();

  const config: AxiosRequestConfig = {
    method: "GET",
    headers: {
      Authorization: token,
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ...headers,
    },
    params,
  };

  try {
    const response = await axios.get<T>(url, config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;

    const responseData = axiosError.response?.data as { message?: string };
    const errorMessage = responseData?.message || axiosError.message || "Something went wrong";
    const status = axiosError?.response?.status;

    if (status === HTTP_STATUS.UNAUTHORIZED && !isRedirecting) {
      isRedirecting = true;
      window.location.href = ROUTES.HOME;
      setTimeout(() => (isRedirecting = false), 1000);
    } else {
      AntdNotification(notification, "error", ErrorMessage(errorMessage));
    }
    throw null;
  }
}

export default Get;
