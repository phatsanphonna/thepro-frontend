import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLoading: false,
  statusMessage: null as string | null,
  error: false,
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
      state.error = true
      state.statusMessage = payload.errorMessage
      state.errorCode = payload.errorCode

    },
    disableError: (state) => {
      state.error = false
      state.statusMessage = null
      state.errorCode = null
    }
  }
})

export default loadingSlice.reducer

export const { setLoading, setStatusMessage, setDefaultLoading, setError, disableError } = loadingSlice.actions