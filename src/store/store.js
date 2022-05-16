import {configureStore, applyMiddleware} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import reducer from "./reducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = configureStore({ reducer }, composedEnhancer);

