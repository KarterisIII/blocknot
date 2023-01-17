import { api } from '../../app/api/api';
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { usersData } from '../search/seachSlice';
import { catchMessage } from '../../config';

const usersAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date)
})
const initialState = usersAdapter.getInitialState()


export const usersApiSlice = api.injectEndpoints({	
	endpoints: builder => ({
		getUsers: builder.query({
			query: () => ({
				url: '/users',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError
				},
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled                    
                    dispatch(usersData(data))
                } catch (err) {					
                    console.log(err)
                }
            },
			transformResponse: responseData => {							
				return usersAdapter.setAll(initialState, responseData)
			},
			providesTags: (result, error, arg) => {	
							
				if (result?.ids) {
					return [
						{ type: 'User', id: 'LIST' },						
						...result.ids.map(id => ({ type: 'User', id })),						
					]
				} else {
					return [{ type: 'User', id: 'LIST' }]
				}
			}
		}),
		updateUser: builder.mutation({
			query: ({value:{
				username,
				surname,
				patronymic,
				salary,
				experience,
				login,
				id},
				checkbox: {
					driver,
					seniorDriver,
					welder,
					education}
			}) => ({
				url: `user/${id}`,
				method: 'PATCH',
				body: {username,
					surname,
					patronymic,
					salary,
					experience,
					login,
					driver,
					seniorDriver,
					welder,
					education}
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				await catchMessage(dispatch, queryFulfilled)
			},
			invalidatesTags: (result, error, arg) => [
				{type: 'User', id: arg.id}
			]
		}),
		
		deleteUser: builder.mutation({
			query: id => ({
				url: `user/${id}`,
				method: 'DELETE',

			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await catchMessage(dispatch, queryFulfilled)
            },
			invalidatesTags: (result, error, arg) => [
				{type: 'User', id: arg.id}
			]
		}) 
	})
})

export const {
	useGetUsersQuery,
	useUpdateUserMutation,
	useDeleteUserMutation
} = usersApiSlice

// export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// const selectUsersData = createSelector(
// 	selectUsersResult,
// 	usersResult => usersResult.data
// )

// export const {
// 	selectAll: selectAllUsers,
// 	selectById: selectUserById,
// 	selectIds: selectUserIds
// } = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)