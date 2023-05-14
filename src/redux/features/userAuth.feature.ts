
import { httpGet } from "@/libs/http"
import { useLocalStorage } from "@/libs/storage/localStorage.lib"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type UserAuth = {
  id: string
  email: string
}

type User = {
  id: string
  userAuthId: string
  email: string
  firstname: string
  lastname: string
  nickname: string
  accessCourse: any[]
}

const initialState = {
  isAuthenticated: false,
  userAuth: null as UserAuth | null,
  user: null as User | null
}

const fetchUser = createAsyncThunk(
  'userAuth/fetchUser', async (userId: string, thunkAPI) => {

    const response = await httpGet('/user')

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
    },
    clearLocalUser: (state) => {
      state.user = null
    },
    setLocalUser: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userAuth = action.payload
    })
  }
})

export default userAuthSlice.reducer

export const { setAuthStatus, getLocalUserAuth, setLocalUser, clearLocalUser } = userAuthSlice.actions