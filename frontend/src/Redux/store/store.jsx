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

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: persistedCartReducer,
    wishlist: wishlistSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
