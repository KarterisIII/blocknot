import React from 'react';
import Work from '../../../../add/work';
import RemoveItem from '../../../../hoc/remove-item';
import WorkItem from '../../../../tabel/body/work'
import Button from './../../../../button/index';

const UserWork = (props) => {
	const { 
		title,
		active,
		data,
		isEvent,
		getWorks,
		handleClick,
		changeIsEvent,
		headTableWork} = props
		
	return (
		<div className='user-work'>
			<div className="user-button">
				<div className='item-box'>
					<Button handleClick={() => handleClick('createWork')}>
						добавить работу
					</Button>
				</div>						
			</div>
			{
				active.createWork
				? <Work 
					data={data}					
					title={title.createWork}
					active={active.createWork}
					
					
				  />
				: <Work 
					data={data}					
					title={title.updateWork}
					active={active.updateWork}					
				  />  
			}
			<RemoveItem 				
				data={data.data}
				active={active.deleteWork}	
				deleteItem={data.functItem}
				handleClose={data.handleClose}			
			/>
			<WorkItem 
				data={getWorks.data}
				isEvent={isEvent}
				changeIsEvent={changeIsEvent}
				isLoading={getWorks.isLoading}
				headTable={headTableWork}
				handleClick={handleClick} />
		</div>
	);
};

export default UserWork;