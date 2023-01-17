import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userArr: []
}

const searchUserSlice = createSlice({
	name: 'searchUser',
	initialState,
	reducers: {
		userSearch(state, action) {
			const {value, users} = action.payload
			console.log(action.payload)
			// if (value !== '') {
			// 	const workArr = typeWork?.ids.map(item => {					
			// 		return typeWork?.entities[item]
			// 	})
			// 	if(workArr) {
			// 		const workName =
			// 		workArr?.filter(work => work?.workName.toLowerCase()
			// 		.includes(value.toLowerCase()))
			// 		state.typeWorkArr = workName
			// 	}
			// } else {
			// 	state.typeWork = []
			// }
		},
		clearUserSearch(state, action) {
			state.userArr = []
		}
	}
})

export const user = (state) => state.searchUser.userArr

export const {userSearch, clearUserSearch} = searchUserSlice.actions

export default searchUserSlice.reducer