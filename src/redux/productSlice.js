import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalProducts: 0,
    page: 1,
    limit: 10,
    loading: false,
    nextPageLoading: false,
    hasMore: true,
    error: null,
};

const productSlice = createSlice({
    name: "products",

    initialState,

    reducers: {

        setLoading(state, action) {
            state.loading = action.payload;
        },
        setNextPageLoading(state, action) {
            state.nextPageLoading = action.payload;
        },

        setError(state, action) {
            state.error = action.payload;
        },

        setHasMore(state, action) {
            state.hasMore = action.payload;
        },

        setPage(state, action) {
            state.page = action.payload;
        },

        setProducts(state, action) {
            state.products = action.payload;
            
        },
        setTotalProducts(state, action) {
            state.totalProducts = action.payload;
        },

        appendProducts(state, action) {
            state.products = [
                ...state.products,
                ...action.payload,
            ];
        },

        resetProducts(state) {
            state.products = [];
            state.page = 1;
            state.loading = false;
            state.hasMore = true;
            state.error = null;
        },

    },
});

export const {
    setLoading,
    setNextPageLoading,
    setError,
    setHasMore,
    setPage,
    setProducts,
    setTotalProducts,
    appendProducts,
    resetProducts,
    
} = productSlice.actions;

export default productSlice.reducer;