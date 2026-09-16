import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice.js";
import productReducer from "./productSlice.js"
import filterReducer from "./filterSlice.js"

export const store = configureStore({
  reducer: {
    // auth: authReducer,
     products: productReducer,
     filters: filterReducer,
  },
});