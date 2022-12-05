import React from 'react';
import { Link } from 'react-router-dom';
import modalWrapper from './../../hoc/modal-wrapper/index';
import EditUser from '../../add/user';
import Button from '../../button'
import './style.scss'


const EditUserWrapper = (props) => {
	const {itemId, 
		handleDelete, 
		onChange, 
		handleChange,
		updateItem} = props
	
	return (
		<div className='edit-user-wrapper'>			
			<div className='content'>
				<div className='content-body'>
					<div className='content-header'>
						<h1>Редактировать</h1>												
					</div>
					<div className="content-main">
						<div className="inner">
							<div className="button">								
								<Link to={`user/${itemId?.id}`}>
									<button>Подробнее</button>
								</Link>
							</div>											
							<Button handleClick={handleDelete}>
								Удалить
							</Button>
						</div>
						<EditUser 
							user={itemId}
							onChange={onChange}	
							handleChange={handleChange}
						 />	
					</div>
					<div className='content-footer'>						
						<Button handleClick={updateItem} >
							Отправить
						</Button>											
					</div>
				</div>
			</div>			
		</div>
	);
};

export default modalWrapper(EditUserWrapper);