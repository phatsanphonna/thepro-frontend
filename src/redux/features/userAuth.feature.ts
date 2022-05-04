import { getAccessToken } from "@/libs/auth/auth.lib"
import { httpGet } from "@/libs/http"
import { useLocalStorage } from "@/libs/storage/localStorage.lib"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type UserAuth = {
  id: string
  email: string
}

const initialState = {
  isAuthenticated: false,
  user: null as UserAuth | null
}

const fetchUser = createAsyncThunk(
  'userAuth/fetchUser', async (userId: string, thunkAPI) => {

    const response = await httpGet('/user', {
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      }
    })

    return response.data
  }
)

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload
    },
    getLocalUserAuth: (state) => {
      //eslint-disable-next-line
      const { getLocalStorageItem } = useLocalStorage()

      const localUserAuth = getLocalStorageItem('localUserAuth')

      if (localUserAuth) {
        state.isAuthenticated = true
        state.user = JSON.parse(localUserAuth)
      } else {
        state.isAuthenticated = false
        state.user = null
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

export default userAuthSlice.reducer

export const { setAuthStatus, getLocalUserAuth } = userAuthSlice.actions