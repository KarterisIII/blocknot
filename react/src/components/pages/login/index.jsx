import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useAuthApiMutation } from '../../../features/auth/authApiSlice';
import { useAppDispatch, useAppSelector } from './../../../hooks/hooks';
import Button from '../../button';
import { inputText, inputObject, clearInput } from '../../../features/input/inputSlice';
import { messageObj, sendMessageError } from '../../../features/message/messageSlice';
import './style.scss'

const Login = () => {	
	const [see, setSee] = useState(false)
	const dispatch = useAppDispatch()
	const {value} = useAppSelector(inputObject)
	const {error} = useAppSelector(messageObj)
	const navigate = useNavigate()
	const [authApi] = useAuthApiMutation()	

	const onChange = (e) => {
		const {id, value} = e.target		
		dispatch(inputText({id, value}))
	}

	const handleChange = () => {
		setSee(prevState => !prevState)
	}

	const evidently = see === false ? 'password' : 'text'
	
	const handleSubmit = async () => {
		await authApi(value).unwrap()
		.then(() => {
			dispatch(clearInput())
			navigate('/blocknot')
		})
		.catch((err) => {
			dispatch(sendMessageError(err))
		})	
	}
	
	// if(token) {				
	// 	return <Navigate to='/blocknot'/>
	// }

	return (
		<div className="container">
			<div className="wrraper">
				<div className='login'>
					<div className='content'>
						<div className='content-body'>
							<div className='content-header'>
								<h4>Авторизация</h4>
							</div>
							<div className='content-main'>
								<div className='login-box'>
									{
										Object.keys(error).length !== 0 
										? 	<div className="edit-box">
												<div className='login-error'>
													<p>{error?.data?.message}</p>
												</div>												
											</div>
										: 	null										
									}
									<form>
										<div className="edit-box">
											<label 
												className='edit-label description' 
												htmlFor="login">Логин</label>
											<input 
												className='edit-text' 
												type="text" 
												id="login"
												name="login" 
												placeholder="Логин"
												value={value.login || ''}
												onChange={onChange} />
										</div>
										<div className="edit-box">
											<label 
												className='edit-label description' 
												htmlFor="password">Пароль</label>
											<input 
												className='edit-text' 
												type={evidently} 
												id="password"
												name="password" 
												placeholder="Пароль"
												autoComplete="on"
												value={value.password || ''}
												onChange={onChange} />
										</div>
										<div className="edit-box">
											<div className='edit-label description'>Показать пароль</div>
											<label 
												className='edit-label' 
												htmlFor="see">
												<input	
													className='edit-checkbox'						 
													type="checkbox" 
													id="see"
													checked={see}
													onChange={handleChange} />
												<div className="edit-slider">
													<div className="edit-knob"></div>
												</div>
											</label>						
										</div>
									</form>									
								</div>								
							</div>							
							<div className='content-footer'>
								<Button 
									handleClick={handleSubmit}>
									Войти</Button>								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	);
};

export default Login;