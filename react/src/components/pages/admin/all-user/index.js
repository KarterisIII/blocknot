import React, { useState } from 'react';
import { useDeleteUserMutation,
		 useGetUsersQuery,
		 useUpdateUserMutation } from '../../../../features/users/usersApiSlice';
import { headTableUsers } from '../../../../service/headTable';
import EditUser from '../../../edit/user';
import UserItem from '../../../tabel/body/user';

const AllUsers = () => {	
	const [active, setActive] = useState(false)
	const [itemId, setItemId] = useState({})
	const [cancel, setCansel] = useState(false)	
	const [message, setMessage] = useState(false)

	const onChange = (e) => {
		const {id, value,} = e.target			
		setItemId(prevState => ({
			...prevState,
			[id]: value,
		}))	
	}

	const handleChange = (e) => {
		const {id} = e.target		
		setItemId(prevState => ({
			...prevState,
			[id]: !itemId[id]
		}))
	}

	const handleClick = (user) => {			
		setActive(true)
		setItemId(user)	
	}

	const {
		data, 
		isLoading,
		} = useGetUsersQuery('getUsers', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})	

	const [deleteUser] = useDeleteUserMutation()
	const [updateUser] = useUpdateUserMutation()

	const deleteItem = async () => {
		await deleteUser(itemId.id).unwrap()
		.then((payload) => {
			setMessage(`${payload.msg}`)
			let messageItem, messageTimer	
			if (!message) {										
				messageTimer = setTimeout(() => {	
					setCansel(false)			
					setActive(false)
				}, 1000)
				messageItem = setTimeout(() => {				
					setMessage(false)			
				}, 1500)
			} else {
				clearTimeout(messageItem)
				clearTimeout(messageTimer)
			}
		})
		.catch((error) => console.error('rejected', error))
	}

	const updateItem = async () => {
		const {work, ...userData} = itemId
		console.log(userData)
		await updateUser(userData).unwrap()
		.then((payload) => {
			setMessage(`${payload.msg}`)
			let messageItem, messageTimer	
			if (!message) {										
				messageTimer = setTimeout(() => {	
					setCansel(false)			
					setActive(false)
				}, 1000)
				messageItem = setTimeout(() => {				
					setMessage(false)			
				}, 1500)
			} else {
				clearTimeout(messageItem)
				clearTimeout(messageTimer)
			}
		})
		.catch((error) => console.error('rejected', error))
	}
	
	return (
		<>			
			<EditUser
				message={message}
				cancel={cancel}
				active={active}
				setCansel={setCansel}
				setActive={setActive}
				functionDelete={deleteItem}	
				itemId={itemId}	
				onChange={onChange}	
				handleChange={handleChange}
				updateItem={updateItem}
				 />			
			<UserItem 
				headTable={headTableUsers} 
				data={data} 
				isLoading={isLoading}
				handleClick={handleClick}
				/>			
		</>
	);
};

export default AllUsers;