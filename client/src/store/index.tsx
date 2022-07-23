import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import notification from "./notification";
import app from './app';
import quiz from './quiz';

const store = configureStore({
    reducer: {
        auth,
        notification,
        app,
        quiz
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;