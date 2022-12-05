import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from '../pages/login';
import UserPage from '../pages/user/user-page';
import User from '../pages/user/admin-page'
import AdminPage from '../pages/admin/page';
import TypeOfWork from '../pages/type-of-work';
import AddWork from '../pages/add-work';
import PresistLogin from '../../features/auth/PersistLogin'
import RequireAuth from '../../features/auth/RequireAuth';
import DashLayout from "../dash-layout";
import { useAppSelector } from '../../hooks/hooks';
import { selectCurrentRole } from '../../features/auth/authSlice';
import Header from '../header/Header';
import Footer from '../footer/Footer';





const App = () => {
	
	const role = useAppSelector(selectCurrentRole)
	const rolePage = role === 0 ? <AdminPage/> : <UserPage />

	return (
		<div className='app'>
			<Header />
			<div className='main'>
				<Routes>			
					<Route index element={<Login/>}/>
					<Route element={<PresistLogin/>}>
						<Route path='blocknot' element={<DashLayout/>}>
							<Route index element={rolePage}/>
							<Route element= {<RequireAuth isRole={role}/>}>
								<Route path='user/:id' element={<User/>}/>
								<Route path='work/new' element={<AddWork/>}/>											
							</Route>
						</Route>																			
					</Route>			
				</Routes>
			</div>			
			<Footer/>
		</div>	
	);
};

export default App;