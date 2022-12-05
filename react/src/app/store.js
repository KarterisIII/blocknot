import { configureStore } from '@reduxjs/toolkit';
import { setupListeners  } from "@reduxjs/toolkit/query";
import {api} from './api/api'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
	reducer: {
		
		[api.reducerPath]: api.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
	devTools: true
})

// setupListeners(store.dispatch)