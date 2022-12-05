import React from 'react';
import { useLocation, Navigate, Outlet } from "react-router-dom"


const RequireAuth = ({isRole}) => {
	
	const location = useLocation()
	
	return (
		1 !== isRole
		?	<Outlet/>
		:	<Navigate to='/' state={{from: location}} replace/>
	);
};

export default RequireAuth;