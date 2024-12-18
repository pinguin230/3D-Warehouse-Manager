import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userStore from "./../store/redusers/user/user.store.ts"
import authStore from "./redusers/auth/auth.store.ts";
import containerStore from "./redusers/container/container.store.ts";
import popupStore from "./redusers/popup/popup.store.ts";
import {itemAPI} from "../services/ItemsService.ts";
import {containerAPI} from "../services/ContainerService.ts";
import {favoriteContainerAPI} from "../services/FavoriteContainerService.ts";
import {favoriteItemAPI} from "../services/FavoriteItemService.ts";
import {reportAPI} from "../services/ReportService.ts";

export const combineReducer = combineReducers({
  userReducer: userStore,
  authReducer: authStore,
  containerReducer: containerStore,
  popupReducer: popupStore,
  [itemAPI.reducerPath]: itemAPI.reducer,
  [containerAPI.reducerPath]: containerAPI.reducer,
  [favoriteContainerAPI.reducerPath]: favoriteContainerAPI.reducer,
  [favoriteItemAPI.reducerPath]: favoriteItemAPI.reducer,
  [reportAPI.reducerPath]: reportAPI.reducer
})

export const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
          .concat(itemAPI.middleware)
          .concat(containerAPI.middleware)
          .concat(favoriteContainerAPI.middleware)
          .concat(favoriteItemAPI.middleware)
          .concat(reportAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch;
export default store;