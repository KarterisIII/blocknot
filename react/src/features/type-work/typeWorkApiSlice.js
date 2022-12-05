import { api } from '../../app/api/api';
import { createEntityAdapter } from '@reduxjs/toolkit';

const typeWorksAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.creationDate.localeCompare(a.date)
})

const initialState = typeWorksAdapter.getInitialState()

export const typeWorkApiSlice = api.injectEndpoints({
	endpoints: builder => ({
		getAllTypeWork: builder.query({
			query: () => ({
				url: '/type-work',
				validateStatus: (response, result) => {
					return response.status === 200 && !result.isError
				},
			}),
			transformResponse: responseData => {
				return typeWorksAdapter.setAll(initialState, responseData)
			},
			providesTags: (result, error, arg) => {
				if(result?.ids) {
					return [
						{type: 'TypeWork', id: 'LIST'},
						...result.ids.map(id => ({
							type: 'TypeWork', id
						})),
					]
				} else {
					return [{type: 'TypeWork', id: 'LIST'}]
				}
			}
		}),
		createTypeWork: builder.mutation({
			query: (typeWorkData) => ({
				url: 'type-work',
				method: 'POST',
				body: {...typeWorkData}
			}),
			invalidatesTags: (result, error, arg) => [
				{type: 'TypeWork', id: arg.id}
			]
		}),
		updateTypeWork: builder.mutation({
			query: (typeWorkData) => ({
				url: `type-work/${typeWorkData.id}`,
				method: 'PATCH',
				body: {...userData}
			}),
			invalidatesTags: (result, error, arg) => [
				{type: 'TypeWork', id: arg.id}
			]
		}),
		deleteTypeWork: builder.mutation({
			query: id => ({
				url: `type-work/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, arg) => [
				{type: 'TypeWork', id: arg.id}
			]
		})
	})
})

export const {
	useCreateTypeWorkMutation,
	useDeleteTypeWorkMutation,
	useGetAllTypeWorkQuery,
	useUpdateTypeWorkMutation
} = typeWorkApiSlice