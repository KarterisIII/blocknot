import React, {useState} from 'react';
import {useNavigate, Navigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../features/auth/authSlice';
import { useAuthApiMutation } from '../../../features/auth/authApiSlice';
import './style.scss'

const Login = () => {	

	const [checked, setChecked] = useState(false)

	const [change, setChange] = useState({
		login: 'ваш логин',
		password: 'ваш пароль',
	})
	const [value, setValue] = useState({
		login: '',
		password: '',
	})

	const navigate = useNavigate()

	const [authApi, {isError, error}] = useAuthApiMutation()
	const dispatch = useDispatch()

	const onChange = (e) => {
		const {id, value} = e.target		
		setValue(prevState => ({
			...prevState,
			[id]: value,
		}))	
		setChange(prevState => ({
			...prevState,
			[id]: value,
		}))
	}

	const handleSubmit = async () => {
		const {login} = value
		try {
			const userData = await authApi({...value}).unwrap()
			dispatch(setCredentials({...userData, login}))
			setValue({
				password: '',
				login: ''
			})
			setChange({
				login: 'ваш логин',
				password: 'ваш пароль',
			})
			navigate('/blocknot')
		} catch (err) {
			console.log("ошибка",error)
		}
	}

	const handleChange = () => {		 
		setChecked(!checked);		
	}

	if(localStorage.getItem("token")) {				
		return <Navigate to='/blocknot'/>
	}

	return (
		<div className='login'>
			<div className="container">
				<div className="wrraper">
					<div className='content'>
						<div className='content-body'>
							<div className='content-header'>
								<h1>{isError ? error.data.message : 'Авторизация'}</h1>
							</div>
							<div className='content-main'>
								<div className='holder'>
									<label htmlFor="login">{change.login}</label>
									<input 
										id='login' 
										value={value.login}
										onChange={onChange}
										type="text" />
								</div>
								<div className='holder'>
									<label htmlFor="password">
										{checked ? change.password : 'ваш пароль'}
									</label>
									<input 
										id='password' 
										value={value.password}
										onChange={onChange}
										type="password" />
								</div>
								<div className='holder-checkbox'>
									<label htmlFor="welder">показать пароль
										<div className="checket">
											{!checked ? 'нет' : 'да'}
										</div>
									</label>
									<input 
										id='welder'
										checked={checked}
										onChange={handleChange} 
										type="checkbox" />									
								</div>
							</div>
							
							<div className='content-footer'>
								<div className='button'>
									<button onClick={handleSubmit}>
										войти
									</button>
								</div>
								<div className='button'>
									<button>
										отмена
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;