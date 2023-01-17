import { api } from '../../app/api/api';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { worksData } from '../search/seachSlice';
import { catchMessage } from '../../config';

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
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled  
                    dispatch(worksData(data))
                } catch (err) {					
                    console.log(err)
                }
            },
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
		searchTypeWorks: builder.query({
			query: (typeWorks) => ({
				url: `/search-type-work${typeWorks}`,
			}),
			transformResponse: responseData => responseData,
		}),
		createTypeWork: builder.mutation({
			query: ({value}) => ({
				url: 'type-work',
				method: 'POST',
				body: {...value}
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await catchMessage(dispatch, queryFulfilled)
            },
			invalidatesTags: (result, error, arg) => [
				{type: 'TypeWork', id: arg.id}
			]
		}),
		updateTypeWork: builder.mutation({
			query: ({ value: { workName, point, id }}) => ({
				url: `type-work/${id}`,
				method: 'PATCH',
				body: {workName, point,}
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await catchMessage(dispatch, queryFulfilled)
            },
			invalidatesTags: (result, error, arg) => [
				{type: 'TypeWork', id: arg.id}
			]
		}),
		deleteTypeWork: builder.mutation({
			query: id => ({
				url: `type-work/${id}`,
				method: 'DELETE'
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await catchMessage(dispatch, queryFulfilled)
            },
			invalidatesTags: (result, error, arg) => [
				{type: 'TypeWork', id: arg.id}
			]
		})
	})
})

export const {
	useCreateTypeWorkMutation,
	useSearchTypeWorksQuery,
	useDeleteTypeWorkMutation,
	useGetAllTypeWorkQuery,
	useUpdateTypeWorkMutation
} = typeWorkApiSlice