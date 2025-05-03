// store.ts
import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import rootReducer from "./reducers"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "settings"], // only persist the 'user' slice
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // important for redux-persist
    }),
})

// Create persistor
export const persistor = persistStore(store)

// Typed dispatch and state for TS users
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
