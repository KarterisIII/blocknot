import React from 'react';
import './modal.scss'




const Modal = (props) => {	
	
	const {handleClose, children, active} = props
	const backgroundModal = active ? 'modal active' : 'modal'
	const contextModal = active ? 'modal__content active' : 'modal__content'
	
	return (
		<div 
			className={backgroundModal} 
			onClick={handleClose}>			
			<div 
				className = {contextModal}
				onClick = {
					e => e.stopPropagation()
				} >
				<div onClick={handleClose} className='modal-close'>
				<span className='close'></span>
				</div>
				{children}
			</div>
			
		</div>
	);
};

export default Modal;