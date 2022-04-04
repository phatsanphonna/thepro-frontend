import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: true,
  user: {
    name: 'โดม'
  }
}

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload
    }
  }
})

export default authUserSlice.reducer

export const { setAuthStatus } = authUserSlice.actions