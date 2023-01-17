import { api } from '../../app/api/api';
import { catchMessage } from '../../config';
import { logOut, setCredentials } from './authSlice';

export const authApiSlice = api.injectEndpoints({
	endpoints: builder => ({
		authApi: builder.mutation({
			query: credentials => ({
				url: '/login',
				method: 'POST',
				body: {...credentials},
			}),			
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled  
					dispatch(setCredentials(data))
                    
                } catch (err) {					
                    console.log(err)
                }
            },			
		}),
		registreitApi: builder.mutation({
			query: ({value, checkbox}) =>({
				url: '/registration',
				method: 'POST',
				body: {...value, ...checkbox}
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await catchMessage(dispatch, queryFulfilled)
            },
			invalidatesTags: (result, error, arg) => [
				{type: 'User', id: arg.id}
			]			
		}),
		logoutApi: builder.mutation({
			query: ()=> ({
				url: '/logout',
                method: 'POST',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(api.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
		}),
		refresh: builder.mutation({
			query: () =>({
				url:'/refresh',
				method: 'GET'
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    
                    dispatch(setCredentials({ ...data }))
                } catch (err) {
					// localStorage.removeItem('token')
                    console.log(err)
                }
            }			
		})
	})
})

export const {
	useAuthApiMutation, 
	useRefreshMutation, 
	useRegistreitApiMutation,
	useLogoutApiMutation} = authApiSlice