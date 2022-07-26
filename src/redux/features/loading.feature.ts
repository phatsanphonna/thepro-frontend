import { createSlice } from "@reduxjs/toolkit";

type NotificationState = 'error' | 'success' | 'idle'

const initialState = {
  globalLoading: false,
  statusMessage: null as string | null,
  error: 'idle' as NotificationState,
  errorCode: null as number | null
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.globalLoading = action.payload
    },
    setStatusMessage: (state, action) => {
      state.statusMessage = action.payload
    },
    setDefaultLoading: (state) => {
      state.globalLoading = false
      state.statusMessage = null
    },
    setError: (state, { payload }) => {
      state.globalLoading = false
      state.error = 'error'
      state.statusMessage = payload.errorMessage
      state.errorCode = payload.errorCode
    },
    setSuccess: (state, { payload }) => {
      state.globalLoading = false
      state.error = 'success'
      state.statusMessage = payload.errorMessage
      state.errorCode = null
    },
    disableError: (state) => {
      state.error = 'idle'
      state.statusMessage = null
      state.errorCode = null
    }
  }
})

export default loadingSlice.reducer

export const { setLoading, setStatusMessage, setDefaultLoading, setError, setSuccess, disableError } = loadingSlice.actions