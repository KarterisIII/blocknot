import React from 'react';
import TypeWork from '../../add/type-work';
import Button from './../../button/index';
import modalWrapper from './../../hoc/modal-wrapper/index';

const EditTypeWorkWrapper = (props) => {
	const {itemId, 
		handleDelete, 
		onChange, 
		handleChange,
		updateItem} = props
	return (
		<div className='edit-type-work-wrapper'>
			<div className='content'>
				<div className="content-body">
					<div className="content-header">
						<h1>Редактировать</h1>
					</div>
				</div>
				<div className="content-main">
					<TypeWork 
						work={itemId}
						onChange={onChange}
						handleChange={handleChange}
					/>
				</div>
				<div className="content-footer">
					<Button handleClick={updateItem}>
						Отправить
					</Button>
				</div>
			</div>			
		</div>
	);
};

export default modalWrapper(EditTypeWorkWrapper);