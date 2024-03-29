import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setCredentials} from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',	
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token	        
		if (token) {
			headers.set("authorization", `Bearer ${token}`)      	
		}
		return headers
	},
	
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)    
    if (result?.error?.status === 401) {        
        const refreshResult = await baseQuery( 
            '/refresh', 
            api, 
            extraOptions)
        if (refreshResult?.data) {            
            api.dispatch(setCredentials({ ...refreshResult.data }))           
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error?.status === 401) {                
            }
            return refreshResult
        }
    }    
    return result
}

export const api = createApi({
	baseQuery: baseQueryWithReauth,
    tagTypes: ['Work', 'User', 'TypeWork'],
	endpoints: builder => ({})
})