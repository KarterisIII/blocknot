import React from 'react';
import TableHeader from '../../../../tabel/header'
import './style.scss'

const UserReport = (props) => {
	const {users, headTable} = props
	
	const headerReport = () => {
		return headTable
	}
	return (
		<div className='user-report'>				
			<div className='table'>
				<TableHeader headTable={headerReport}/>					
					{
						users.length === 0
						? null
						: <div className="table-body">
							{users.map((user, idx) => {
								const username = `${user.surname} 
								${user.username.slice(0, 1)}. 
								${user.patronymic.slice(0, 1)}.`
								return (
									<div key={user.id} className="table-line">
										<div className="item box">{idx + 1}</div>
										<div className="item box">{username}</div>
										<div className="item box">{user.driver}</div>
										<div className="item box">{user.experience}</div>			
										<div className="item box">{user.seniorDriver}</div>
										<div className="item box">{user.salary}</div>
										<div className="item box">{user.welder}</div>
										<div className="item box">{user.education}</div>
										<div className="item box">{user.sum}</div>
									</div>
								)
							})}
						  </div>
					}					
			</div>			
		</div>
	);
};

export default UserReport