import React from 'react';
import { userDate } from '../../../../config';

const UserInform = (props) => {
	const {user} = props
	const screenWidth = window.screen.width	
	const username = screenWidth < 767 
		? `${user.surname} ${user.username.slice(0, 1)}. ${user.patronymic.slice(0, 1)}.` 
		: `${user.surname} ${user.username} ${user.patronymic}` 
	const mainMachine = screenWidth < 767 ? 'С. М.' : 'Старший машины'
	const DriverLicense = screenWidth < 767  ? 'В. П.' : 'Водительские права'
	return (
		<>
			<div className='information'>
				<div className="item user-name">
					<div className='item-box'>
						<div className='description box'>
							работник
						</div>
						<div className="title box">
							{username}
						</div>								
					</div>							
				</div>
				<div className="item experience">
					<div className='item-box'>
						<div className='description box'>
							стаж
						</div>
						<div className="title box">
							{userDate(user.experience)}
						</div>	
					</div>
				</div>
				<div className="item exams">
					<div className='item-box'>
						<div className='description box'>
							экзамен
						</div>
						<div className="title box">
							{user.exams}
						</div>	
					</div>
				</div>
				<div className="item salary">
					<div className='item-box'>
						<div className='description box'>
							оклад
						</div>
						<div className="title box">
							<span>{user.salary}</span>р.
						</div>	
					</div>
				</div>
			</div>
			<div className='information'>
				<div className="item driver">
					<div className='item-box'>
						<div className='description box'>
							{mainMachine}
						</div>
						<div className="title box">
							{user.driver ? 'да' : 'нет'}
						</div>	
					</div>
				</div>
				<div className="item driver-license">
					<div className='item-box'>
						<div className='description box'>
							{DriverLicense}
						</div>
						<div className="title box">
							{user.driver ? 'да' : 'нет'}
						</div>	
					</div>
				</div>
				<div className="item welder">
					<div className='item-box'>
						<div className='description box'>
							сварщик
						</div>
						<div className="title box">
							{user.welder ? 'да' : 'нет'}
						</div>	
					</div>
				</div>
				<div className="item education">
					<div className='item-box'>
						<div className='description box'>
							высшие образование
						</div>
						<div className="title box">
							{user.education ? 'да' : 'нет'}
						</div>	
					</div>
				</div>
			</div>
		</>
	)
}

export default UserInform;