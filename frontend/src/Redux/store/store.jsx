import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import cartSlice from "../cart/cartSlice";
import userSlice from "../user/userSlice";
import wishlistSlice from "../wishlist/wishlistSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishlist", "user"],
};

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  wishlist: wishlistSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
