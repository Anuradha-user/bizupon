// import { ApiLayout } from "./ApiLayout.js";
import apiLayout from "./apiLayout";
import api from "./axios";



/*********************Auth Services****************************** */

export const loginApi = (data) =>
    api.post(apiLayout.login, data);
export const registerApi = (data) =>
    api.post(apiLayout.register, data);

export const refreshTokenApi = (data) =>
    api.post(apiLayout.refresh, data);

export const logoutApi = () =>
    api.post(apiLayout.logout);

export const emailVerificationApi = (data) =>
    api.post(apiLayout.emailVerification, null, {
      params: {
        email: data.email,
        otp: data.otp
      }
    });



export const emailResendOtpApi = (email) =>
  api.patch(apiLayout.emailResendOtp, null, {
    params: {
      email,
    },
  });



  /*********************Product Services****************************** */

  export const getProductList = (params ) =>
  api.get(apiLayout.productListing, {
    params
  });


//product detail Api


export const getProductDetails = (params) =>
    api.get(apiLayout.productApi, {
        params
    })


//car filter data api
export const getFilterData = () =>
  api.get(apiLayout.filterApi);