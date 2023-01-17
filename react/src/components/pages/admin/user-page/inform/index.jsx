import React from 'react';
import EditUser from '../../../../add/user'
import UserInform from '../../../user/inform';
import Button from './../../../../button/index';

const UserData = (props) => {
	const {
		user,
		title,
		active, 
		updateUser,
		handleClick, 
		handleClose} = props

	
	return (
		<div className='user-data'>
			<EditUser 
				title={title}
				active={active}
				functItem={updateUser}
				handleClose={handleClose}
			/>
			<div className="user-button">
				<div className='item-box'>
					<Button handleClick={() => handleClick('editUser')}>
						редактировать
					</Button>
				</div>						
			</div>
			<UserInform user={user} />
		</div>
	);
};

export default UserData;