import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    globalLoading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.globalLoading = action.payload
        }
    }
})

export default loadingSlice.reducer

export const { setLoading } = loadingSlice.actions