import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState:{id: null, token: null, role: null},
	reducers: {
		setCredentials: (state, action) => {
			const {accessToken, user, user:{role, id}} = action.payload
			localStorage.setItem('token', accessToken)
			state.id = id
			state.token = accessToken
			state.role = role
			state.user = user
		},
		logOut: (state) => {
			localStorage.removeItem('token')
			state.id = null
			state.token = null
			state.role = null
			state.user = null
		}
	}
})

export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentRole = (state) => state.auth.role
export const selectCurrentId = (state) => state.auth.id
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUser = (state) => state.auth.user
