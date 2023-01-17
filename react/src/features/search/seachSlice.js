import { createSlice } from '@reduxjs/toolkit';
import { inputText } from '../input/inputSlice';
import { closeModal } from '../modal/modalSlice';
import { addWorkId } from '../work/workFormSlice';

const initialState = {
	searchArr: {},
	works: [],
	users: [],
	usersReport: []
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		worksData(state, action) {
			const works = action.payload.ids.map(item => {
				return action.payload.entities[item]
			})
			state.works = [...works]
		},
		usersData(state, action) {
			const users = action.payload.ids.map(item => {
				return action.payload.entities[item]
			})			
			state.users = [...users]
		},
		workSearch(state, action) {			
			const {value, id} = action.payload	
			if (value !== '') {
				const workName =
					state.works.filter(work => work.workName.toLowerCase()
						.includes(value.toLowerCase()))					
						state.searchArr = {
							[id]: workName
						}
			} else {
				state.searchArr = []
			}
		},
		userSearch(state, action) {
			const {value, id} = action.payload			
			if (value !== '') {
				const surname =
					state.users.filter(user => user.surname.toLowerCase()
						.includes(value.toLowerCase()))
						state.searchArr = {
							[id]: surname
						}
			} else {
				state.searchArr = []
			}
		},
		reportSearch(state, action) {
			const {startDate, endDate} = action.payload
			const start = new Date(startDate).toLocaleDateString()
			const end = new Date(endDate).toLocaleDateString()
			const users = state.users.map(user => {	
				let arrNum = []
				let points
				const t = Date.parse(new Date()) - Date.parse(user.experience)
				const year = Math.floor(t / (1000 * 60 * 60 * 24 * 30 * 12))
				user.exp = year * 500
				for (const key in user) {
					if(user[key] === true ) {
						user = { ...user, ...{[key]: 500}}
					} else if (user[key] === false) {
						user = { ...user, ...{[key]: 0}}
					}					 
				}				
				const work = user.work.map(w => {
					w.date = new Date(w.date).toLocaleDateString()
					return w										
				}).filter(w => w.workDone === true)
				  .filter(w => w.date >= start && w.date <= end)				
				if (work.length != 0) {
					console.log(true)
					points =  work.map(w => w.point).reduce((p, n) => p + n, 0 )
									
				} 
				for (const key in user) {
					if(typeof user[key] === 'number') {
						if (key !== 'role') {
							arrNum.push(user[key])
						}						
					} 
				}			
				const sum = arrNum.reduce((p, n) => p + n, 0)
				if (points) {
					user.sum = points + sum
				} else {
					user.sum = sum
				}
				user.points = points
				user.work = work				
				return {surname: user.surname, 
						username: user.username,
						patronymic: user.patronymic,
						driver: user.driver,
						education: user.education,
						salary: user.salary,
						experience: user.exp,
						points: user.points,
						welder: user.welder,
						seniorDriver: user.seniorDriver,
						exams: user.exams,
						sum: user.sum,
						id: user.id}
				// return user
			})
			users.sort((a, b) => a.surname > b.surname ? 1 : -1);
			state.usersReport = [...users]
		},
		clearSearch(state, action) {
			state.searchArr = []
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addWorkId, (state, action) => {
			state.searchArr = []
		})
		builder.addCase(closeModal, (state, action) => {
			state.searchArr = []
		})
		builder.addCase(inputText, (start, action) => {
			start.usersReport = []
		})
	}
})

export const arrSearch = (state) => state.search.searchArr
export const usersSearch = (state) => state.search.usersReport

export const { 
		worksData, 
		usersData, 
		workSearch, 
		userSearch, 
		clearSearch,
		reportSearch } = searchSlice.actions

export default searchSlice.reducer