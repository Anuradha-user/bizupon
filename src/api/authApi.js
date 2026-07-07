import { ApiLayout } from "./apiLayout.js";
import api from "./axios";

export const loginApi = (data) =>
    api.post(ApiLayout.login, data);
export const registerApi = (data) =>
    api.post(ApiLayout.register, data);

export const refreshTokenApi = (data) =>
    api.post(ApiLayout.refreshtoken, data);

export const logoutApi = () =>
    api.post(ApiLayout.authLogout);