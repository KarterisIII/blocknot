import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllTypeWorkQuery, } from '../../../../../features/type-work/typeWorkApiSlice';
import { 
	useGetUsersQuery, 
	useUpdateUserMutation } from '../../../../../features/users/usersApiSlice';
import { 
	useDeleteWorkMutation, 	
	useUpdateWorkMutation,
	useCreateWorkMutation, 
	useGetWorksByUserIdQuery} from '../../../../../features/work/workApiSlice';
import {headTableWork} from '../../../../../service/headTable'
import { openModal, closeModal, activeModal } from '../../../../../features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { inputEdirUser, inputWork } from '../../../../../features/input/inputSlice';
import { addWorkId } from '../../../../../features/work/workFormSlice';
import Loading from '../../../../loading'
import UserWork from '../work-list';
import UserData from './../inform';
import './style.scss'
import { eventObject,  changeTable} from './../../../../../features/screenWidth/screenWidthSlice';

const title = {
	editUser: 'Редактировать работника',
	createWork: 'Создание работы',
	updateWork: 'Редактировать работу',	
}

const UserAdmin = () => {
	const [data, setData] = useState({})	
	const dispatch = useAppDispatch()
	const active = useAppSelector(activeModal)
	const isEvent = useAppSelector(eventObject)
	const {id} = useParams()
	const [updateWork] = useUpdateWorkMutation()
	const [deleteWork] = useDeleteWorkMutation()
	const [updateUser] = useUpdateUserMutation()
	const [createWork] = useCreateWorkMutation()

	const {user} = useGetUsersQuery('usersList', {
		selectFromResult: ({data}) => ({
			user: data?.entities[id]
		})
	})

	const userList = useGetUsersQuery('usersList', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const typesWorks = useGetAllTypeWorkQuery('typesWorks', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const getWorks = useGetWorksByUserIdQuery(id, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const handleClick = (active, data) => {
		dispatch(openModal(active))
		switch (active) {
			case 'editUser': 
				dispatch(inputEdirUser(user))
				setData({functItem: updateUser})
				break
			case 'createWork':
				dispatch(addWorkId({item: id}))				
				setData({functItem: createWork, handleClose})				
				break
			case 'deleteWork':				
				setData({
					functItem: deleteWork, 
					handleClose, 
					data: {
						userId: id, 
						id: data}})
				break
			case 'updateWork':	
				dispatch(inputWork({data, usersId: userList.data}))			
				setData({functItem: updateWork, handleClose,})				
			default:
				break;
		}
	}

	const handleClose = () => {
		dispatch(closeModal())
	}

	return (
		<div className='user'>
			<div className='container'>
				<div className='wrraper'>
					{
						!user
						? <Loading/>
						: <UserData
							user={user}
							title={title.editUser}
							active={active.editUser}
							updateUser={data.functItem}
							handleClick={handleClick}
							handleClose={handleClose}
						/>
					}
					<UserWork										
						title={title}						
						active={active}
						isEvent={isEvent.tableWork}
						getWorks={getWorks}
						data={data}	
						changeIsEvent={changeTable.changeTableWork}					
						handleClose={handleClose}
						handleClick={handleClick}
						headTableWork={headTableWork}				
					/>
				</div>
			</div>			
		</div>
	);
};

export default UserAdmin;