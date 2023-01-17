import { useGetUsersQuery } from '../../../../features/users/usersApiSlice';
import {checkBool, checkDate, checkNum, userDate} from '../../../../config'
import tabelWrapper from '../../../hoc/tabel-wrapper';
import { Link } from 'react-router-dom';


const UserItem = (props) => {
	const {index, item, handleClick, screenWidth} = props
	
	const {user} = useGetUsersQuery('getUsers', {
		selectFromResult: ({data}) => ({
			user: data?.entities[item]
		})
	})	
	
	const worker = screenWidth < 767 
		? `${user?.surname} ${user?.username.slice(0, 1)}. ${user?.patronymic.slice(0, 1)}.` 
		: `${user?.surname} ${user?.username} ${user?.patronymic}`

	return (
		<div className="table-line">
			<div className="item box">{index + 1}</div>
			{screenWidth < 767
				? null
				:<div className="item box">{checkDate(user?.date)}</div>}
			<div 
				title='подробнее' 
				className="item box link-item">
				<Link className='link' to={`user/${user?.id}`}>{worker}</Link>
			</div>
			<div className="item box">{userDate(user?.experience)}</div>
			{screenWidth < 767
				? null
				: <div className="item box">{user?.exams}</div>}
			<div className="item box">{checkNum(user?.salary)}</div>			
			<div 
				onClick={() => handleClick('deleteUser', user.id)} 
				className="item box link-item">удалить</div>
		</div>
	);
};

export default tabelWrapper(UserItem);