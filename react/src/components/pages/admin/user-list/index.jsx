import React from 'react';
import RemoveItem from '../../../hoc/remove-item';
import UserItem from '../../../tabel/body/user'
import './style.scss'

const UsersList = (props) => {
	const {
		data,
		active,
		isEvent,
		userList,
		changeIsEvent,
		headTableUsers, 
		handleClick,} = props	

	return (
		<div className='users-list'>
			<RemoveItem 
				data={data.value}
				active={active} 
				deleteItem={data.functItem} 
				handleClose={data.handleClose}/>
			<UserItem 
				isEvent={isEvent}
				changeIsEvent={changeIsEvent}
				headTable={headTableUsers} 
				data={userList.data} 
				isLoading={userList.isLoading}
				handleClick={handleClick}
				/>
		</div>
	);
};

export default UsersList;