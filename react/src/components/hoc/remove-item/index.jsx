import { useState } from 'react';
import './style.scss'
import Button from './../../button/index';
import Modal from '../../modal/Modal';
import Message from './../form-wrapper/massege/index';

const initialState = {	
	error: '',
	anser: '',	
}

const RemoveItem = (props) => {
	const {id, functionData, handleClose, active} = props	
	
	const [message, setMassege] = useState(initialState)
	
	const handleDelete = async () => {
		console.log(id)
		await functionData(id).unwrap()
		.then(payload => {				
			setMassege(prevState => ({
				...prevState,
				anser: payload.msg
			}))		
			let timerMessage, timerActive;
			if (!message.anser) {
				timerMessage = setTimeout(() => {
					handleClose()
				}, 1000)
				
				timerActive = setTimeout(() => {					
					setMassege(initialState)
				}, 1800)
			} else {					
				clearTimeout(timerMessage)	
				clearTimeout(timerActive)				
			}				
		})
		.catch(error => {
			setMassege(prevState => ({
				...prevState,
				error: error
			}))			
		})
	}

	return (
		<div className="remove-item">
			<Modal active={active} handleClose={handleClose}>
				{	!message.anser
					? 	<div className='content'>
							<div className='content-body'>
								<div className='content-header'>
									<h1>Удалить</h1>
								</div>
								<div className='content-footer'>
									<Button handleClick={handleDelete}>
										Да
									</Button>
									<Button handleClick={handleClose}>
										нет
									</Button>						
								</div>							
							</div>		
						</div>
					:	<Message message={message.anser}/>
				}
				
			</Modal>
		</div>
	);
};

export default RemoveItem;