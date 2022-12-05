import { useState } from 'react';
import Modal from '../../../modal/Modal';
import Form from '../form';
import Message from './../massege/index';

 const initialState = {
	error: '',
	anser: '',
 }

const formWrapper = (View) => {
	return (props) => {
		const {active, functionData, title, handleClose, data} = props
		const [value, setValue] = useState(data)
		const [message, setMassege] = useState(initialState)

		const onChange = (e) => {
			const {id, value} = e.target		
			setValue(prevState => ({
				...prevState,
				[id]: value,
			}))	
			setMassege(prevState => ({
				...prevState,
				error: ''
			}))			
		}

		const handleChange = (e) => {
			const {id} = e.target 
			setValue(prevState => ({
				...prevState,
				[id]: !value[id]
			}));
			setMassege(prevState => ({
				...prevState,
				error: ''
			}))						
		}

		const handleCloseModal = () => {	
			setValue({})
			handleClose()
			let timer;
			if (message) {
				timer = setTimeout(() => {
					setMassege(initialState)	
				}, 500)
			} else {
				clearTimeout(timer)
			}				
		}

		const handleClick = async () => {
			await functionData({...value}).unwrap()
			.then(payload => {
				setValue({})
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
						console.log(message)
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
				console.log(error)
			})
		}

		return (
			<Modal active={active} handleClose={handleCloseModal}>
				{
					!message.anser
					? <Form 
						message={message.error.data}
						title={title} 
						handleClose={handleCloseModal}
						handleClick={handleClick}>
						<View
							message={message.error}
							value={value}
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