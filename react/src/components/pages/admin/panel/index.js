import React from 'react'
import Button from '../../../button'
import TypeWork from '../../../add/type-work';
import EditUser from '../../../add/user'
import './style.scss'

const AdminPanel = (props) => {
	const {
		active, 
		registreitApi, 
		createTypeWork,
		handleClick,
		handleClose
	} = props		
	
	return (
		<div className="admin-panel">			
			<TypeWork 
				title={'Создать вид работы'}
				active={active.createTypeWork} 
				handleClose={handleClose}
				functionData={createTypeWork}
			/>
			<EditUser
				title={'Создать работника'}
				active={active.createUser} 
				handleClose={handleClose}
				functionData={registreitApi}
			/>
			<div className="content">
				<div className="content-body">
					<div className="panel-button-box">
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