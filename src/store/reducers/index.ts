// reducers/index.ts
import { combineReducers } from "@reduxjs/toolkit"
import settingsReducer from "./settings-slice"
import userReducer from "./user-slice"

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
})

export default rootReducer
