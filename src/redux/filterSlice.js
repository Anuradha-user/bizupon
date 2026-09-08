
import { createSlice } from "@reduxjs/toolkit";
const initialState ={

    loading: true,
    error: null,

    makers: [],
    model:[],
    bodyTypes: [],
    fuelTypes: [],
    transmissions: [],
    bodyTypeCategory:[],
    country:[],
    port:[]
}
const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Start Loading
    setFilterLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Store Filter Data
    setFilterData: (state, action) => {
      const payload = action.payload || {};

      state.makers = payload.lstmaker || [];
      state.model=payload.lstmodel || [];
      state.bodyTypes = payload.lstbodytype || [];
      state.fuelTypes = payload.lstfuletype || [];
      state.transmissions = payload.lsttransmission || [];
      state.bodyTypeCategory=payload.lstBodyTypeCategory || [];
      state.country=payload.lstCountry ||[];
      state.port=payload.lstPort||[];

      state.loading = false;
      state.error = null;
    },

    // API Error
    setFilterError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Optional: Clear Error
    clearFilterError: (state) => {
      state.error = null;
    },

    // Optional: Reset Filter Data
    resetFilterState: (state) => {
      state.loading = false;
      state.error = null;
      state.makers = [];
      state.model=[];
      state.bodyTypes = [];
      state.fuelTypes = [];
      state.transmissions = [];
      state.bodyTypeCategory=[];
      state.country=[];
      state.port=[];

      
    },
  },
});

export const {
  setFilterLoading,
  setFilterData,
  setFilterError,
  clearFilterError,
  resetFilterState,
} = filterSlice.actions;

export default filterSlice.reducer;