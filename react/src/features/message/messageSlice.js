import { createSlice } from '@reduxjs/toolkit';
import { closeModal } from '../modal/modalSlice';
import { addWorkId } from '../work/workFormSlice';
import { inputText } from '../input/inputSlice';

const initialState = {
	error: {},
	anser: '',
}

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		sendMessageAnser(state, action) {
			state.anser = action.payload
		},
		sendMessageError(state, action) {
			console.log(action.payload)
			state.error = action.payload
		},
		clearMessage(state, action) {			
			state.error = {},
			state.anser = ''			
		}
	},
	// Очень рано закрываеться!!!!! пока не трогать
	extraReducers: (builder) => {
		builder.addCase(closeModal, (state, action) => {
			state.error = {}						
		}),
		builder.addCase(addWorkId, (state, action) => {
			state.error = {}
		})
		builder.addCase(inputText, (state, action) => {
			state.error = {}
		})
	}
})

export const messageObj = (state) => state.message

export const {
	sendMessageAnser,
	sendMessageError,
	clearMessage,
} = messageSlice.actions

export default messageSlice.reducer