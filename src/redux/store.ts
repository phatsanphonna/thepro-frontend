import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from "./features/userAuth.feature";
import loadingReducer from './features/loading.feature'

export const store = configureStore({
    reducer: {
        userAuth: authUserReducer,
        loading: loadingReducer
    },
    devTools: process.env.NODE_ENV === 'development'
})