import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from "./features/authUser.feature";
import loadingReducer from './features/loading.feature'

export const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        loading: loadingReducer
    },
    devTools: process.env.NODE_ENV === 'development'
})