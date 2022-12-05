import React from 'react';
import { userDate } from '../../../../config';

const index = (props) => {
	const {user} = props
	
	return (
		<>
			<div className='information'>
				<div className="item user-name">
					<div className='item-box'>
						<div className='description box'>
							имя работника
						</div>
						<div className="title box">
							{user.surname} {user.username} {user.patronymic}
						</div>								
					</div>							
				</div>
				<div className="item experience">
					<div className='item-box'>
						<div className='description box'>
							непрерывный стаж
						</div>
						<div className="title box">
							{userDate(user.experience)}
						</div>	
					</div>
				</div>
				<div className="item exams">
					<div className='item-box'>
						<div className='description box'>
							баллы за экзамен
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
							<span>{user.salary}</span> руб
						</div>	
					</div>
				</div>
			</div>
			<div className='information'>
				<div className="item driver">
					<div className='item-box'>
						<div className='description box'>
							старший машины
						</div>
						<div className="title box">
							{user.driver ? 'да' : 'нет'}
						</div>	
					</div>
				</div>
				<div className="item driver-license">
					<div className='item-box'>
						<div className='description box'>
							водительские права
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

export default index;