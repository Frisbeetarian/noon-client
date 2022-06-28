// import {createStore} from "redux";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { configureStore, createSlice, ThunkAction } from "@reduxjs/toolkit";
// import reducer from './bugs';
import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";
import toast from "./middleware/toast";
import api from "./middleware/api";
import { Action } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer,
    middleware: [
      // ...getDefaultMiddleware(),
      // logger({destination: "console"}),
      toast,
      api,
      // func
    ],
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

export const selectSubject = (id) => (state) =>
  state?.[subjectSlice.name]?.[id];
