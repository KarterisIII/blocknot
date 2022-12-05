import React from 'react'
import TypeWorkItem from '../../../tabel/body/type-work'
import RemoveItem from '../../../hoc/remove-item';



const AllTypeWork = (props) => {
	const {
		getTypeWorks, 
		typeWork, 
		active,
		headTableTypeWork,
		deleteTypeWork, 
		handleClick, 
		handleClose} = props		

	return (
		<div className='type-works-list'>
			<RemoveItem
				active={active} 
				functionData={deleteTypeWork} 
				handleClose={handleClose}
				id={typeWork}
			/>		
			<TypeWorkItem
				headTable={headTableTypeWork}
				data={getTypeWorks.data}
				isLoading={getTypeWorks.isLoading}
				handleClick={handleClick}
			/>
		</div>
	);
};

export default AllTypeWork;