// import { ApiLayout } from "./ApiLayout.js";
import ApiLayout from "./apiLayout";
import api from "./axios";

export const loginApi = (data) =>
    api.post(ApiLayout.login, data);
export const registerApi = (data) =>
    api.post(ApiLayout.register, data);

export const refreshTokenApi = (data) =>
    api.post(ApiLayout.refresh, data);

export const logoutApi = () =>
    api.post(ApiLayout.logout);

export const emailVerificationApi = (data) =>
    api.post(ApiLayout.emailVerification, data);



export const emailResendOtpApi = (email) =>
  api.patch(ApiLayout.emailResendOtp, null, {
    params: {
      email,
    },
  });