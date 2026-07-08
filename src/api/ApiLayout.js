// export const baseURL = "http://192.168.10.199:8002";
export const baseURL = "http://192.168.10.199";

// let USER_AUTH = `${baseURL}/api`;
let USER_AUTH = `${baseURL}:8002/api`;
let USER_REG = `${baseURL}:8010/api`;

const ApiLayout = {
  // ****************** Auth Api ******************
  login: `${USER_AUTH}/Account/Account`,
  register: `${USER_REG}/User/Registration`,
  logout: `${USER_AUTH}/Account/logout`,
  refresh: `${USER_AUTH}/Account/refresh`,
  signup: `${USER_AUTH}/Account/signup`,
}

export default ApiLayout;