import { api } from '../../app/api/api';
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

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
			query: (userData) => ({
				url: `user/${userData.id}`,
				method: 'PATCH',
				body: {...userData}
			}),
			invalidatesTags: (result, error, arg) => [
				{type: 'User', id: arg.id}
			]
		}),
		deleteUser: builder.mutation({
			query: id => ({
				url: `user/${id}`,
				method: 'DELETE',

			}),
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