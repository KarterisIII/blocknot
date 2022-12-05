import 'react-app-polyfill/ie11'
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './components/App/App'
import 'normalize.css'
import './main.scss'
import { store } from './app/store';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
	<Provider store={store}>
		<BrowserRouter>		
			<Routes>
				<Route path='/*' element={<App/>}/>
			</Routes>								
		</BrowserRouter>		
	</Provider>
	
);