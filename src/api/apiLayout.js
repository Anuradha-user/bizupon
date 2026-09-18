export const baseURL = "https://192.168.10.199";


// let USER_AUTH = `${baseURL}/api`;
let Authenication_API = `${baseURL}:8012/api`;
let User_Management = `${baseURL}:8110/api`;
let Web_Front = `${baseURL}:8111/api`;
let Product_Purchase_management = `${baseURL}:8016/api`;
let Purchase_API = `${baseURL}:8016/api`;


const apiLayout = {
  // ****************** Auth Api ******************
  login: `${Authenication_API}/Account/Account`,
  register: `${User_Management}/User/Registration`,
  emailVerification: `${User_Management}/User/email-otp-verification`,

  emailResendOtp: `${User_Management}/User/email-otp-resend`,
 
  logout: `${Authenication_API}/Account/logout`,
  refresh: `${Authenication_API}/Account/refresh`,
  signup: `${Authenication_API}/Account/signup`,



    // ****************** External API ******************
productlist:`https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData`,
product:`https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData`,
productFilter:`https://jaishriganesha.com/BizuponInterview/api/Home/GetProductData`,


  // ****************** Product API ******************

filterApi:`${Web_Front}/Home/GetDDLMasterProductCounts`,
productListing:`${Web_Front}/Home/productList`,
productApi:`${Web_Front}/Home/GetUnSoldProductDetailsByProduct`,
CarData: `${Web_Front}/Home/GetDDLMaster`,





/** view-purchase */

viewPurchaseMasterListAPI: `${Product_Purchase_management}/Purchase/GetViewPurchaseMaster`,
auctionYardDataAPI: `${Product_Purchase_management}/Purchase/GetAuctionYardByAuctionId`,
viewPurchase: `${Purchase_API}/Purchase/View-Purchase`



}




export default apiLayout;
