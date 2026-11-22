import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from './slices/CartSlices';

const store = configureStore({
    reducer : {
        cartReducer
    }
})

export default store

export type StoreType = ReturnType <typeof store.getState>