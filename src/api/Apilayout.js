export const baseURL = "https://192.168.10.199";

let USER_AUTH = `${baseURL}:8012/api`;
let USER_REG = `${baseURL}:8110/api`;
let MasterApi = `${baseURL}:8111/api`;
let ProductList = `${baseURL}:8019/api`;

const ApiLayout = {
  // ****************** Auth Api ******************
  login: `${USER_AUTH}/Account/Account`,
  register: `${USER_REG}/User/Registration`,
  emailVerification: `${USER_REG}/User/email-otp-verification`,
  emailResendOtp: `${USER_REG}/User/email-otp-resend`,

  logout: `${USER_AUTH}/Account/logout`,
  refresh: `${USER_AUTH}/Account/refresh`,
  signup: `${USER_AUTH}/Account/signup`,
  CarData: `${MasterApi}/Home/GetDDLMaster`,
};

export default ApiLayout;