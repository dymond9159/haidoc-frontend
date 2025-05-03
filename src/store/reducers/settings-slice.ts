// reducers/settingsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SettingsState {
  theme: "light" | "dark"
  isCollapse: boolean
  isSideBarOpen: boolean
}

const initialState: SettingsState = {
  theme: "light",
  isCollapse: false,
  isSideBarOpen: false,
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload
    },
    setCollapse(state, action: PayloadAction<boolean>) {
      state.isCollapse = action.payload
    },
    toggleCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    setSideBarOpen(state, action: PayloadAction<boolean>) {
      state.isSideBarOpen = action.payload
    },
  },
})

export const { setTheme, setCollapse, toggleCollapse, setSideBarOpen } =
  settingsSlice.actions
export default settingsSlice.reducer
