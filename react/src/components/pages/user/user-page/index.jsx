import React from 'react';
import { selectCurrentUser } from '../../../../features/auth/authSlice';
import { useAppSelector } from '../../../../hooks/hooks';
import UserTableWork from '../work'
import UserInform from '../inform'
import { headTableWork } from '../../../../service/headTable';
import './style.scss'

const UserPage = () => {
	const user = useAppSelector(selectCurrentUser)	
	
	return (
		<div className='user'>
			<div className='container'>
				<div className="wrapper">
					<UserInform user={user} />
					<UserTableWork id={user.id} headTable={headTableWork} />
				</div>				
			</div>
		</div>
	);
};

export default UserPage;