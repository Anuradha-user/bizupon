// export const baseURL = "http://192.168.10.199:8002";
export const baseURL = "https://192.168.10.199";

// let USER_AUTH = `${baseURL}/api`;
let USER_AUTH = `${baseURL}:8002/api`;
let USER_REG = `${baseURL}:8010/api`;
let PRODUCT = `${baseURL}:8111/api`;


const apiLayout = {
  // ****************** Auth Api ******************
  login: `${USER_AUTH}/Account/Account`,
  register: `${USER_REG}/User/Registration`,
  emailVerification: `${USER_REG}/User/email-otp-verification`,

  emailResendOtp: `${USER_REG}/User/email-otp-resend`,
 
  logout: `${USER_AUTH}/Account/logout`,
  refresh: `${USER_AUTH}/Account/refresh`,
  signup: `${USER_AUTH}/Account/signup`,



    // ****************** External API ******************
productlist:`https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData`,
product:`https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData`,
productFilter:`https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData`,


  // ****************** Product API ******************

filterApi:`${PRODUCT}/Home/GetDDLMasterProductCounts`,
productListing:`${PRODUCT}/Home/productList`,
productApi:`${PRODUCT}/Home/GetUnSoldProductDetailsByProduct`

}





export default apiLayout;