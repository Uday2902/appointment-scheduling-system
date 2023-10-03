import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload.token;
            console.log("finale1",state.token)
        },
        setLogout: (state, action) => {
            state.userData = null;
            state.token = null;
            state.isAuthenticated = false
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated
        },
        setUserData: (state, action) => {
            state.userData = action.payload.userData;
        }
        // setErrors: (state, action) => {

        // }
    }
})

export const { setLogin, setLogout, setAuthenticated, setLoading, setUser, setUserData} = authSlice.actions;
export default authSlice.reducer;


