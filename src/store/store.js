import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./actions/authActions";


const reducers = combineReducers({
    auth: authReducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {}
        })
});
