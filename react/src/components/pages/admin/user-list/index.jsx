import React from 'react';
import RemoveItem from '../../../hoc/remove-item';
import UserItem from '../../../tabel/body/user'

const UsersList = (props) => {
	const {
		active,
		data, 
		user, 
		headTableUsers, 
		deleteUser, 
		isLoading, 
		handleClick,
		handleClose} = props	

	return (
		<div className='users-list'>
			<RemoveItem 
				active={active} 
				functionData={deleteUser} 
				handleClose={handleClose}
				id={user}/>
			<UserItem 
				headTable={headTableUsers} 
				data={data} 
				isLoading={isLoading}
				handleClick={handleClick}
				/>
		</div>
	);
};

export default UsersList;