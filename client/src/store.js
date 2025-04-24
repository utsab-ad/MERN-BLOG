import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/user/user.slice.js";
import sessionStorage from "redux-persist/es/storage/session";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

const rootReducer = combineReducers({
    user: userReducer
})

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ serializableCheck: false})
  });

  export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itse
