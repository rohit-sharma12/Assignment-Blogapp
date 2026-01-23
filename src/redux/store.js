import { createSlice, configureStore } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: !!token,    
        user: user || null,
        token: token || null,
    },
    reducers: {
        login(state, action) {
            state.isLogin = true;
            state.user = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout(state) {
            state.isLogin = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer,
});
