import { useGetUsersQuery } from '../../../../features/users/usersApiSlice';
import {checkBool, checkDate, checkNum, userDate} from '../../../../config'
import tabelWrapper from '../../../hoc/tabel-wrapper';
import { Link } from 'react-router-dom';


const UserItem = (props) => {
	const {index, item, handleClick} = props
	
	const {user} = useGetUsersQuery('getUsers', {
		selectFromResult: ({data}) => ({
			user: data?.entities[item]
		})
	})	
	
	const worker = `${user?.surname} ${user?.username} ${user?.patronymic}`

	return (
		<div className="table-line">
			<div className="item description box">{index + 1}</div>
			<div className="item description box">{checkDate(user?.date)}</div>
			<div 
				title='подробнее' 
				className="item description box">
				<Link className='link' to={`user/${user?.id}`}>{worker}</Link>
			</div>
			<div className="item description box">{userDate(user?.experience)}</div>
			<div className="item description box">{checkNum(user?.salary)}</div>
			<div className="item description box">{user?.exams}</div>
			<div className="item description box">баллы</div>
			<div 
				onClick={() => handleClick('deleteUser', user.id)} 
				className="item description delete-link">удалить</div>
		</div>
	);
};

export default tabelWrapper(UserItem);