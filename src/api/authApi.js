// import apiLayout from "./ApiLayout";
import ApiLayout from "./ApiLayout";
import api from "./axios";

export const loginApi = (data) =>
    api.post(apiLayout.login, data);
export const registerApi = (data) =>
    api.post(apiLayout.register, data);

export const refreshTokenApi = (data) =>
    api.post(apiLayout.refresh, data);

export const logoutApi = () =>
    api.post(apiLayout.logout);

export const emailVerificationApi = (data) =>
    api.post(apiLayout.emailVerification, data);



export const emailResendOtpApi = (email) =>
  api.patch(apiLayout.emailResendOtp, null, {
    params: {
      email,
    },
  });

export const getFilterData = () =>
  api.get(ApiLayout.filterApi);