import formWrapper from '../../hoc/form-wrapper/wrapper';
import './style.scss'

const EditUser = (props) => {
	const {value, onChange, handleChange} = props	
	
	return (
		<div className='edit-user'>
			<fieldset>
				<legend className='legend'>Данные входа</legend>	
				<div className="edit-holder">
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
							value={value?.login || ''}
							onChange={onChange} />
					</div>
					<div className="edit-box">
						<label 
							className='edit-label description' 
							htmlFor="password">Пароль</label>
						<input 
							className='edit-text' 
							type="text" 
							id="password"
							name="password" 
							placeholder="пароль"
							value={value?.password || ''}
							onChange={onChange} />
					</div>	
				</div>
			</fieldset>	
			<fieldset>
				<legend className='legend'>Личные данные</legend>	
				<div className="edit-holder">
					<div className="edit-box">
						<label 
							className='edit-label description' 
							htmlFor="username">Имя</label>
						<input 
							className='edit-text' 
							type="text" 
							id="username"
							name="username"
							placeholder="Имя"
							value={value?.username || ''}
							onChange={onChange} />
					</div>	
					<div className="edit-box">
						<label 
							className='edit-label description' 
							htmlFor="patronymic">Отчество</label>
						<input 
							className='edit-text' 
							type="text" 
							id="patronymic"
							name="patronymic" 
							placeholder="Отчество"
							value={value?.patronymic || ''}
							onChange={onChange} />
					</div>
					<div className="edit-box">
						<label 
							className='edit-label description' 
							htmlFor="surname">Фамилия</label>
						<input 
							className='edit-text' 
							type="text" 
							id="surname"
							name="surname" 
							placeholder="Фамилия"
							value={value?.surname || ''}
							onChange={onChange} />
					</div>	
				</div>
			</fieldset>	
			<fieldset>
				<legend className='legend'>Личные качества</legend>	
				<div className="edit-holder">
					<div className="edit-box">
						<label 
							className='edit-label description' 
							htmlFor="experience">Непрерывный стаж</label>
						<input 
							className='edit-date' 
							type="date" 
							id="experience"
							name="experience" 
							value={value?.experience || ''}
							onChange={onChange} />
					</div>					
					<div className="edit-box">
						<label 
							className='edit-label description' 
							htmlFor="salary">Оклад</label>
						<input 
							className='edit-text' 
							type="number"
							id="salary" 
							name="salary" 
							placeholder="Оклад"
							value={value?.salary || ''}
							onChange={onChange} />
					</div>					
				</div>
				<div className="edit-holder">
					<div className="edit-box">
						<div className='description'>Сварщик</div>
						<label 
							className='edit-label' 
							htmlFor="welder">
							<input	
								className='edit-checkbox'						 
								type="checkbox" 
								id="welder"
								name="welder"
								checked={value?.welder || false}
								onChange={handleChange}	/>
							<div className="edit-slider">
								<div className="edit-knob"></div>
							</div>
						</label>						
					</div>	
					<div className="edit-box">
						<div className='description'>Старший машины</div>
						<label 
							className='edit-label' 
							htmlFor="seniorDriver">
							<input	
								className='edit-checkbox'						 
								type="checkbox" 
								id="seniorDriver"
								name="seniorDriver"
								checked={value?.seniorDriver || false}
								onChange={handleChange}	/>
							<div className="edit-slider">
								<div className="edit-knob"></div>
							</div>
						</label>						
					</div>				
				</div>
				<div className="edit-holder">
					<div className="edit-box">
						<div className='description '>Водительские права</div>
						<label 
							className='edit-label' 
							htmlFor="driver">
							<input	
								className='edit-checkbox'						 
								type="checkbox" 
								id="driver"
								name="driver"
								checked={value?.driver || false}
								onChange={handleChange}	/>
							<div className="edit-slider">
								<div className="edit-knob"></div>
							</div>
						</label>						
					</div>
					<div className="edit-box">
						<div className='description '>Высшие образование</div>
						<label 
							className='edit-label' 
							htmlFor="education">
							<input	
								className='edit-checkbox'						 
								type="checkbox" 
								id="education"
								name="education"
								checked={value?.education || false}
								onChange={handleChange}	/>
							<div className="edit-slider">
								<div className="edit-knob"></div>
							</div>
						</label>						
					</div>
				</div>
			</fieldset>			
		</div>
	);
};

export default formWrapper(EditUser);