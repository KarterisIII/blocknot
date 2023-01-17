import { configureStore } from '@reduxjs/toolkit';
import { setupListeners  } from "@reduxjs/toolkit/query";
import {api} from './api/api'
import authReducer from '../features/auth/authSlice'
import workFormSlice from '../features/work/workFormSlice';
import searchSlice from './../features/search/seachSlice';
import inputSlice from '../features/input/inputSlice';
import modalSlice from './../features/modal/modalSlice';
import messageSlice from '../features/message/messageSlice';
import screenWidthSlice from '../features/screenWidth/screenWidthSlice';

export const store = configureStore({
	reducer: {		
		[api.reducerPath]: api.reducer,
		auth: authReducer,
		workForm: workFormSlice,
		search: searchSlice,
		input: inputSlice,
		modal: modalSlice,
		message: messageSlice,
		screenWidth: screenWidthSlice,
	},
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
	devTools: true
})

// setupListeners(store.dispatch)