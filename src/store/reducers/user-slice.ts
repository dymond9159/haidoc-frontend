// reducers/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  name: string
  loggedIn: boolean
}

const initialState: UserState = {
  name: "",
  loggedIn: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name
      state.loggedIn = action.payload.loggedIn
    },
    logout(state) {
      state.name = ""
      state.loggedIn = false
    },
  },
})

export const { updateUser, logout } = userSlice.actions
export default userSlice.reducer
