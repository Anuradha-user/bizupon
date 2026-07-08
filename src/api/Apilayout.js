export const baseURL = "http://192.168.10.199:8002";
let USER_AUTH = `${baseURL}/api`;

const ApiLayout = {
  // ****************** Auth Api ******************
  login: `${USER_AUTH}/Account/Account`,
  logout: `${USER_AUTH}/Account/logout`,
  refresh: `${USER_AUTH}/Account/refresh`,
  signup: `${USER_AUTH}/Account/signup`,
}

export default ApiLayout;