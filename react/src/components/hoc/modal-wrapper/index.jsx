import {useEffect, useState} from 'react';
import Modal from '../../modal/Modal';
import RemoveItem from '../remove-item';


const modalWrapper = (View) => {
	return (props) => {
		const {
			active, 
			cancel, 
			setCansel,			
			setActive,
			updateItem,
			itemId,
			onChange,
			handleChange,
			message,
			functionUpdate,
			functionDelete} = props	
			
		const handleDelete = () => {
			setCansel(true)
		}

		const handleCancel = () => {
			setCansel(false)			
		}

		const handleClose = () => {	
			let timer		
			setActive(false)
			if(active) {
				timer = setTimeout(() => {
					setCansel(false)
				}, 500)
			} else {
				clearTimeout(timer)
			}
								
		}	
		
		const handleCloseDelete = () => {
			setCansel(false)
			setActive(true)
		}

		return (														
			<Modal active={active} handleClose={handleClose}>
				{
					message
					? <div className='content'>
						<div className='error_body'>								
							<h2>{message}</h2>								
						</div>
						</div>
					: cancel	
					?	<RemoveItem 
							handleClose={handleCloseDelete}
							functionDelete={functionDelete}
							/>
					:	<View 
							cancel={cancel}
							handleDelete={handleDelete}
							handleUpdate={functionUpdate}
							handleCancel={handleCancel}
							handleClose={handleClose}
							itemId={itemId}
							onChange={onChange}	
							updateItem={updateItem}
							handleChange={handleChange}
								/>
				}
			</Modal>			
		)
	}	
}

export default modalWrapper;