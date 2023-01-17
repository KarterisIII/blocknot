import { createSlice } from '@reduxjs/toolkit';
import { closeModal } from '../modal/modalSlice';
import { addWorkId,} from '../work/workFormSlice';
const initialState = {
	value: {},
	checkbox: {}
}

const inputSlice = createSlice({
	name: 'input',
	initialState,
	reducers: {
		inputText(state, action) {			
			const {id, value} = action.payload
			state.value = {
				...state.value,
				[id]: value
			}
		},
		inputCheckbox(state, action) {
			const {id, value} = action.payload
			state.checkbox = {
				...state.checkbox,
				[id]: !state.checkbox[id]
			}
		},
		clearInput(state, action) {
			state.value = {}
			state.checkbox = false
		},
		inputEdirUser(state, action) {
			const {username,
				surname,
				patronymic,
				salary,
				experience,
				login,
				driver,
				seniorDriver,
				welder,
				id,
				education} = action.payload
			state.value = {
				username,
				surname,
				patronymic,
				salary,
				experience,
				login,
				id
			}
			state.checkbox = {
				driver,
				seniorDriver,
				welder,
				education
			}
			console.log(action.payload)
		},
		inputTypeWork(state, action) {
			const {workName, point, id} = action.payload
			state.value = {
				...state.value,
				workName,
				point,	
				id						
			}
		},
		inputWork(state, action) {
			const {value:{
				comment, 
				workName, 
				workDone, 
				userId, 
				optics, 
				copper}, 
				usersId} = action.payload
				console.log(action.payload)
			const userArr = usersId?.ids.map(item => {					
				return usersId?.entities[item]
			})
			const users = userId.map((id, idx) => {
				const user = userArr.find(elem => elem.id === id)
				return user.surname				
			})
			const userName = Object.assign({}, ...users
				.map((user, idx) => ({ [`workerId-${idx + 1}`]: user})))			
			state.value = {
				...state.value,
				comment,
				workName,
				optics,
				copper,
				...userName				
			}			
			state.checkbox = {workDone}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addWorkId, (state, action) => {			
			const {id, value} = action.payload
			state.value = {
				...state.value,
				[id]: value
			}
		})
		builder.addCase(closeModal, (state, action) => {
			state.value = {}
			state.checkbox = {}
		})	
	}
})

export const inputObject = (state) => state.input

export const {
		inputText, 
		inputWork,
		inputTypeWork,
		inputCheckbox, 
		inputEdirUser,
		clearInput} = inputSlice.actions

export default inputSlice.reducer