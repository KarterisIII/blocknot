import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from '../pages/login';
import UserPage from '../pages/user/page';
import User from '../pages/admin/user-page/page'
import AdminPage from '../pages/admin/page';
import AddWork from '../pages/add-work';
import PresistLogin from '../../features/auth/PersistLogin'
import RequireAuth from '../../features/auth/RequireAuth';
import DashLayout from "../dash-layout";
import { useAppSelector } from '../../hooks/hooks';
import { selectCurrentRole } from '../../features/auth/authSlice';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useGetAllTypeWorkQuery } from '../../features/type-work/typeWorkApiSlice';
import ReportPage from './../pages/admin/report/page/index';

const App = () => {
	
	const role = useAppSelector(selectCurrentRole)	
	
	const typeWorks = useGetAllTypeWorkQuery('getTypeWork', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const rolePage = role === 0 
		?	<AdminPage typeWorks={typeWorks}/> 
		: 	<UserPage />

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
								<Route path='report' element={<ReportPage/>}/>									
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