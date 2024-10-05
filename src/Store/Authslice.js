import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  userRole: null,
  username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.userRole = action.payload.role
      state.username = action.payload.username
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.userRole = null
      state.username = null
    },
  },
})

export const { login, logout } = authSlice.actions

export const selectAuth = (state) => state.auth

export default authSlice.reducer