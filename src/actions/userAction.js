import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from "./types";
import { USER_SERVER, AUTH_SERVER } from "../config";

export const registerUser = async (dataToSubmit) => {
  const request = await axios
    .post(`${USER_SERVER}`, dataToSubmit)
    .then((response) => response)
    .catch((error) => error.response);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${AUTH_SERVER}`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const token = localStorage.getItem("token");
  const config = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  const request = axios
    .get(`${USER_SERVER}/me`, config)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  localStorage.removeItem("token");

  return {
    type: LOGOUT_USER,
  };
}
