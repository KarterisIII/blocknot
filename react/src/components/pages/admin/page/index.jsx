import { useState } from 'react';
import AdminPanel from '../panel'
import Search from '../search'
import UsersList from './../user-list';
import { headTableUsers, headTableTypeWork } from '../../../../service/headTable';
import AllTypeWork from './../all-type-work/index';
import {
	useDeleteTypeWorkMutation,
	useCreateTypeWorkMutation, 
	useGetAllTypeWorkQuery } from '../../../../features/type-work/typeWorkApiSlice';
import { useRegistreitApiMutation } from '../../../../features/auth/authApiSlice';
import { useDeleteUserMutation, useGetUsersQuery } from '../../../../features/users/usersApiSlice';
import './style.scss'

const initialState = {
	deleteUser: false,
	createUser: false,
	createTypeWork: false,
	deleteTypeWork: false
}

const AdminPage = () => {	
	const [activeModal, setActiveModal] = useState(initialState)
	const [item, setItem] = useState({})
	const [createTypeWork] = useCreateTypeWorkMutation()
	const [registreitApi] = useRegistreitApiMutation()
	const [deleteUser] = useDeleteUserMutation()
	const [deleteTypeWork] =useDeleteTypeWorkMutation()
	const {
		data, 
		isLoading,
		} = useGetUsersQuery('getUsers', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const getTypeWorks = useGetAllTypeWorkQuery('getTypeWork', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const handleClick = (active, item ) => {
		setItem(item)
		console.log(item)
		setActiveModal(prevState => ({
			...prevState,
			[active]: true,
		}))
	}	

	const handleClose = () => {
		setActiveModal(false)
		setItem({})
	}
	
	return (
		<div className='admin'>			
			<div className='container'>
				<div className="wrraper">								
					<AdminPanel 
						active={activeModal}
						createTypeWork={createTypeWork}
						registreitApi={registreitApi}
						handleClick={handleClick}
						handleClose={handleClose}
					/>
					<AllTypeWork
						typeWork={item}
						active={activeModal.deleteTypeWork}
						deleteTypeWork={deleteTypeWork}
						headTableTypeWork={headTableTypeWork}
						getTypeWorks={getTypeWorks}
						handleClick={handleClick}
						handleClose={handleClose}
					/>					
					<Search/>
					<UsersList 
						isLoading={isLoading}
						active={activeModal.deleteUser}
						data={data} 
						user={item}
						deleteUser={deleteUser}
						headTableUsers={headTableUsers}
						handleClick={handleClick}
						handleClose={handleClose} />
				</div>
			</div>
		</div>
	);
};

export default AdminPage;