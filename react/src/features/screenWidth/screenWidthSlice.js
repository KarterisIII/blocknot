import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tableUser: false,
	tableWork: false,
	tableTypeWork: false,
	tableReport: false
}

const screenWidthSlice = createSlice({
	name: 'screenWidth',
	initialState,
	reducers: {
		changeTableUser(state, action) {
			state.tableUser = true
		},
		changeTableWork(state, action) {
			state.tableWork = true
		},
		changeTableTypeWork(state, action) {
			state.tableTypeWork = true
		},
		changeTableReport(state, action) {
			state.tableReport = true
		}
	}
})

export const eventObject = (state) => state.screenWidth

export const changeTable = screenWidthSlice.actions

export default screenWidthSlice.reducer