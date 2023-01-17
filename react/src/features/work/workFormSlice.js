import { createSlice } from '@reduxjs/toolkit';
import { inputText, inputWork } from '../input/inputSlice';
import { closeModal } from '../modal/modalSlice';

const initialState = {
	valueSearch: {},
	searchArr: [],
	addWorkId: '',
	addWorkerIdArr: [],
	workerObj: {},
	elementArr: [],
	search: '',
	count: 0,
}

const workFormSlice = createSlice({
	name: 'workForm',
	initialState,
	reducers: {		
		addInput(state, action) {	
			state.count = state.count + 1		
			state.elementArr.push(`workerId-${state.count}`)
		},		
		deleteInput(state, action) {
			const {id, value} = action.payload
			Reflect.deleteProperty(state.workerObj, id)			
			const arr = [];
			for (let key in state.workerObj) {
				if(state.workerObj.hasOwnProperty(key)){
					 arr.push(state.workerObj[key])				  
				}
			  }			  
			state.addWorkerIdArr = [...arr]
			state.elementArr = state.elementArr.filter(elem => elem !== id)			
		}, 
		clearElementArr(state, action) {
			state.count = 0
			state.elementArr = []
		},		
		addWorkId(state, action) {
			const {item, id} = action.payload				
			if(id === 'workName') {
				state.addWorkId = item
			} else {					
				state.addWorkerIdArr.push(item) 
				state.workerObj = {
					...state.workerObj,
					[id]: item
				}
			}					
		},
		clearWorkId(state, action) {
			state.addWorkerIdArr = []
		}
	},
	extraReducers: (builder) => {
		builder.addCase(closeModal, (state, action) => {			
			state.valueSearch = {}
			state.searchArr = []
			state.addWorkId = ''
			state.addWorkerIdArr = []
			state.workerObj = {}
			state.elementArr = []
			state.search = ''
			state.count = 0
		}),
		builder.addCase(inputWork, (state,action) => {			
			const {value: {userId, id}} = action.payload			
			const elem = userId.map((id, idx) => {
				state.workerObj = {
					...state.workerObj,
					[`workerId-${idx + 1}`]: id
				}
				return `workerId-${idx + 1}`
			})	
			state.addWorkId = id		
			state.count = userId.length
			state.elementArr = [...elem]
			state.addWorkerIdArr = [...userId]
		})
		builder.addCase(inputText, (state, action) => {
			const {id, value} = action.payload
			if (value !== '') {
				Reflect.deleteProperty(state.workerObj, id)				
				const arr = [];
				for (let key in state.workerObj) {
					if(state.workerObj.hasOwnProperty(key)){
						arr.push(state.workerObj[key])				  
					}
				}				
				state.addWorkerIdArr = [...arr]				
			}	
		})	
	}
})

export const searchArr = (state) => state.workForm.searchArr
export const addWork = (state) => state.workForm.addWorkId
export const addWorker = (state) => state.workForm.addWorkerIdArr
export const elemArr = (state) => state.workForm.elementArr

export const {	deleteInput, 
				addWorkId, 
				addInput, 
				inputSearch,				
				clearElementArr,
				clearWorkId, } = workFormSlice.actions

export default workFormSlice.reducer