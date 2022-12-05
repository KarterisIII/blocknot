import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInform from '../inform'
import UserTableWork from '../work'
import Work from '../../../add/work'
import Modal from '../../../modal/Modal';
import Button from '../../../button'
import {headTableWork} from '../../../../service/headTable'
import Loading from '../../../loading'
import { useGetUsersQuery } from '../../../../features/users/usersApiSlice';
import './style.scss'

const index = () => {
	const [active, setActive] = useState(false)
	const {id} = useParams()

	const {user} = useGetUsersQuery('usersList', {
		selectFromResult: ({data}) => ({
			user: data?.entities[id]
		})
	})	

	const handleClick = () => {
		setActive(true)
	}

	const handleClose = () => {
		setActive(false)
	}

	return (			
		<div className='user'>
			<div className='container'>
				<div className="wrraper">
					<Modal active={active} handleClose={handleClose}>
						<Work userId={id} handleClose={handleClose}/>
					</Modal>
					{
						!user
						? <Loading/>
						: <UserInform user={user} />
					}
					<div className="content">
						<Button handleClick={handleClick}>
							добавить работу
						</Button>
					</div>												
					<UserTableWork 
						id={id}
						active={active} 
						headTable={headTableWork}
						handleClose={handleClose} />				
				</div>				
			</div>
		</div>		
	);
};

export default index;