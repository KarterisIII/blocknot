import React from 'react'
import TypeWorkItem from '../../../tabel/body/type-work'
import RemoveItem from '../../../hoc/remove-item';
import TypeWork from '../../../add/type-work';



const AllTypeWork = (props) => {
	const {
		isEvent,
		changeIsEvent,
		typeWorks,
		active,
		data,
		headTableTypeWork,
		handleClick} = props
		
	return (
		<div className='type-works-list'>
			<TypeWork 
				active={active.updateTypeWork}
				handleClose={data.handleClose}
				functItem={data.functItem}
			/>
			<RemoveItem				
				data={data.value}
				active={active.deleteTypeWork} 
				handleClose={data?.handleClose}
				deleteItem={data?.functItem}

			/>		
			<TypeWorkItem
				isEvent={isEvent}
				changeIsEvent={changeIsEvent}
				headTable={headTableTypeWork}
				data={typeWorks.data}
				isLoading={typeWorks.isLoading}
				handleClick={handleClick}
			/>
		</div>
	);
};

export default AllTypeWork;