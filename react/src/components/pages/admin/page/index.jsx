import { useState } from 'react';
import AdminPanel from '../panel'
import Search from '../search'
import UsersList from './../user-list';
import { headTableUsers, headTableTypeWork } from '../../../../service/headTable';
import AllTypeWork from '../type-work-list';
import {
	useDeleteTypeWorkMutation,
	useCreateTypeWorkMutation,
	useUpdateTypeWorkMutation} from '../../../../features/type-work/typeWorkApiSlice';
import { useRegistreitApiMutation } from '../../../../features/auth/authApiSlice';
import { 
	useDeleteUserMutation, 
	useGetUsersQuery } from '../../../../features/users/usersApiSlice';
import { activeModal, closeModal, openModal } from './../../../../features/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { inputTypeWork } from '../../../../features/input/inputSlice';
import ReportLink from '../report/link';
import { eventObject, changeTable } from './../../../../features/screenWidth/screenWidthSlice';
import './style.scss'

const AdminPage = (props) => {
	const {typeWorks}	= props	
	const [data, setData] = useState({})
	const dispatch = useAppDispatch()
	const active = useAppSelector(activeModal)
	const isEvent = useAppSelector(eventObject)
	const [createTypeWork] = useCreateTypeWorkMutation()
	const [registreitApi] = useRegistreitApiMutation()
	const [deleteUser] = useDeleteUserMutation()
	const [deleteTypeWork] =useDeleteTypeWorkMutation()
	const [updateTypeWork] = useUpdateTypeWorkMutation()	

	const userList = useGetUsersQuery('getUsers', {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const handleClose = () => {
		dispatch(closeModal())
	}

	const handleClick = (active, value) => {
		console.log(active, value)
		dispatch(openModal(active))
		switch (active) {
			case 'createUser':
				setData({functItem: registreitApi, handleClose})
				break;
			case 'deleteUser':
				setData({functItem: deleteUser, handleClose, value})
				break;
			case 'createTypeWork':
				setData({functItem: createTypeWork, handleClose})
				break;
			case 'updateTypeWork':
				dispatch(inputTypeWork({...value}))
				setData({functItem: updateTypeWork, handleClose, })
				break;
			case 'deleteTypeWork':
				setData({functItem: deleteTypeWork, handleClose, value})
				break;
			default:
				break;
		}
	}		
	
	return (
		<div className='admin'>			
			<div className='container'>
				<div className="wrraper">								
					<AdminPanel 
						data={data}
						active={active}
						handleClick={handleClick}/>
					<AllTypeWork
						isEvent={isEvent.tableTypeWork}
						data={data}
						changeIsEvent={changeTable.changeTableTypeWork}
						active={active}						
						headTableTypeWork={headTableTypeWork}
						typeWorks={typeWorks}
						handleClick={handleClick} />
					<UsersList 
						isEvent={isEvent.tableUser}
						changeIsEvent={changeTable.changeTableUser}
						data={data}
						userList={userList}
						active={active.deleteUser}	
						headTableUsers={headTableUsers}
						handleClick={handleClick}/>
					<ReportLink />
				</div>
			</div>
		</div>
	);
};

export default AdminPage;