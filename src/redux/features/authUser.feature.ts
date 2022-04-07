import { useLocalStorage } from "@/libs/storage/localStorage.lib"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  isAuthenticated: true,
  user: {
    name: 'เจน'
  }
}

const fetchUserAuth = createAsyncThunk(
  'authUser/fetchUserAuth', async (thunkAPI) => {
    const { getLocalStorageItem } = useLocalStorage()
    return getLocalStorageItem('jwt')
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
      const { getLocalStorageItem } = useLocalStorage()

      const localAuthUser = getLocalStorageItem('localAuthUser')

      if (localAuthUser) {
        const parsedLocalAuthUser = JSON.parse(localAuthUser)

        state.isAuthenticated = true

      }
    }
  },
})

export default authUserSlice.reducer

export const { setAuthStatus } = authUserSlice.actions