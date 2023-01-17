import {api} from '../../app/api/api'
import { createEntityAdapter } from '@reduxjs/toolkit'
import { catchMessage } from '../../config'

const worksAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date)
})
const initialState = worksAdapter.getInitialState()

export const workApiSlice = api.injectEndpoints({
	endpoints: builder => ({
		getWorksByUserId: builder.query({
			query: (id) => ({
				url: `/works/${id}`,
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError
				},
			}),
			transformResponse: responseData => {								
				return worksAdapter.setAll(initialState, responseData)
			},
			providesTags: (result, error, arg) => {	
								
				if (result?.ids) {
					return [
						{ type: 'Work', id: 'LIST' },						
						...result.ids.map(id => ({ type: 'Work', id })),						
					]
				} else {
					return [{ type: 'Work', id: 'LIST' }]
				}
			}
		}),
		createWork: builder.mutation({
			query: ({workId, usersId, value: {comment, optics, copper}, checkbox: {workDone}}) => ({
				url: '/work',
				method: 'POST',
				body: {workId, usersId, comment, optics, copper, workDone}
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await catchMessage(dispatch, queryFulfilled)
            },
			invalidatesTags: (result, error, arg) => [
				{type: 'Work', id: arg.id}
			]
		}),
		updateWork: builder.mutation({
			query: ({workId, usersId, value: {comment, optics, copper}, checkbox: {workDone}}) => ({
				url: `/work`,
				method: 'PATCH', 
				body: {workId, usersId, comment, optics, copper, workDone}
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await catchMessage(dispatch, queryFulfilled)
            },
			invalidatesTags: (result, error, arg) => [
				{type: 'Work', id: arg.id}
			]
		}),
		deleteWork: builder.mutation({
			query: ({userId, id}) => ({
				url: `/work/${id}`,
				body: userId,
				method: 'DELETE'
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await catchMessage(dispatch, queryFulfilled)
            },
			invalidatesTags: (result, error, arg) => [
				{type: 'Work', id: arg.id}
			]
		})
	})
})

export const {
		useGetWorksByUserIdQuery,
		useCreateWorkMutation,
		useUpdateWorkMutation,
		useDeleteWorkMutation} = workApiSlice