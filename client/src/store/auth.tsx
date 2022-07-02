import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import IAuthState from "../interfaces/IAuthState";

export const initialAuthState: IAuthState = {
    username: null,
    isAdmin: false,
    _id: null,
    access_token: null,
    refresh_token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action: PayloadAction<IAuthState>) {
            state.username = action.payload.username;
            state._id = action.payload._id;
            state.isAdmin = action.payload.isAdmin;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        logout(state) {
            state.username = null;
            state._id = null;
            state.isAdmin = false;
            state.access_token = null;
            state.refresh_token = null;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;