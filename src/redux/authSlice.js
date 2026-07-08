import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: "",
   isLoggedIn: false,
    loading: false,
    user: null,
     status:null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
 setLoginData: (state, action) => {
      
      state.userdeatils = action.payload;
      state.token = action.payload.jwtToken;
      state.isLoggedIn = true;
      state.status=action.payload.status
    },
    logout: (state) => {
      state.userdeatils = null;
      state.token = null;
      state.isLoggedIn = false;
    },

        // setAuthTokens: (state, action) => {
        //     state.accessToken = action.payload.accessToken;
            
        // },
        // setUser: (state, action) => {
        //     state.user = action.payload;
        // },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // logout: (state) => {
        //     state.accessToken = "";
            
        //     state.user = null;
        // }
    }
});