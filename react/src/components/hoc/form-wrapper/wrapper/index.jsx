import Modal from '../../../modal/Modal';
import Form from '../form';
import Message from './../massege/index';
import { useAppDispatch, useAppSelector } from './../../../../hooks/hooks';
import { inputCheckbox, inputText, inputObject } from '../../../../features/input/inputSlice';
import { messageObj } from './../../../../features/message/messageSlice';

const formWrapper = (View) => {
	return (props) => {
		const {active, title, handleClose, functItem} = props
		const dispatch = useAppDispatch()
		const value = useAppSelector(inputObject)
		const message = useAppSelector(messageObj)
		const onChange = (e) => {
			const {id, value} = e.target
			dispatch(inputText({id, value}))	
		}		

		const handleChange = (e) => {
			const {id, value} = e.target			
			dispatch(inputCheckbox({id, value}))						
		}		

		const handleClick = async () => {
			await functItem({...value}).unwrap()			
		}

		return (
			<Modal active={active} handleClose={handleClose}>
				{
					!message.anser
					? <Form 
						message={message.error}
						title={title} 
						handleClose={handleClose}
						handleClick={handleClick}>
						<View									
							message={message.error}
							valueObj={value}
							onChange={onChange}							
							handleChange={handleChange}
						/>
					  </Form>
					: <Message message={message.anser}/>
				}				
			</Modal>			
		)
	}	
}

export default formWrapper;