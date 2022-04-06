import { useStorage } from "@/libs/storage/storage.lib"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: true,
  user: {
    name: 'เจน'
  }
}

const fetchUserAuth = createAsyncThunk(
  'authUser/fetchUserAuth', async (thunkAPI) => {
    const { getStorageItem } = useStorage()
    return getStorageItem('jwt')
  }
)

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload
    },
    getLocalUserAuth: (state) => {
      //eslint-disable-next-line
      const { getStorageItem } = useStorage()

      const localAuthUser = getStorageItem('localAuthUser')

      if (localAuthUser) {
        const parsedLocalAuthUser = JSON.parse(localAuthUser)

        state.isAuthenticated = true

      }
    }
  },
})

export default authUserSlice.reducer

export const { setAuthStatus } = authUserSlice.actions