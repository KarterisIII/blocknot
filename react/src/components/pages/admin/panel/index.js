import React from 'react'
import Button from '../../../button'
import TypeWork from '../../../add/type-work';
import EditUser from '../../../add/user'
import './style.scss'

const AdminPanel = (props) => {
	const {
		data,
		active,
		handleClick,		
	} = props
	
	return (
		<div className="admin-panel">			
			<TypeWork
				title={'Создать вид работы'}
				active={active.createTypeWork} 
				handleClose={data.handleClose}
				functItem={data.functItem}
			/>
			<EditUser
				functItem={data.functItem}
				title={'Создать работника'}
				handleClose={data.handleClose}
				active={active.createUser}
			/>
			<div className="content">
				<div className="content-body">
					<div className="panel-box">
						<Button handleClick={() => handleClick('createUser')}>
							создать работника
						</Button>
						<Button handleClick={() => handleClick('createTypeWork')}>
							создать вид работы
						</Button>
						<Button handleClick={() => handleClick('questions')}>
							создать вопросы
						</Button>						
					</div>
				</div>										
			</div>									
		</div>
	);
};

export default AdminPanel;