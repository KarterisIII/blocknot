import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	action: {}
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state, action) {
			state.action = {
				[action.payload]: true
			}
		},
		closeModal(state, action) {
			state.action = {}
		},
	}
})

export const activeModal = (state) => state.modal.action

export const {openModal, closeModal} = modalSlice.actions

export default modalSlice.reducer