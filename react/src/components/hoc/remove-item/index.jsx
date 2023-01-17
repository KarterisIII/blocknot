import Button from './../../button/index';
import Modal from '../../modal/Modal';
import Message from './../form-wrapper/massege';
import { messageObj } from './../../../features/message/messageSlice';
import { useAppSelector } from '../../../hooks/hooks';
import './style.scss'
const RemoveItem = (props) => {
	const {data, handleClose, deleteItem, active} = props	
	const message = useAppSelector(messageObj)
	const handleDelete = async () => {		
		await deleteItem(data).unwrap()		
	}	

	return (
		<div className="remove-item">
			<Modal active={active} handleClose={handleClose}>
				{	!message.anser
					? 	<div className='content'>
							<div className='content-body'>
								<div className='content-header'>
									<h4>Удалить</h4>
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