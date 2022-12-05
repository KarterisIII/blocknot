import React, { useEffect, useState } from 'react'
import modalWrapper from '../../hoc/modal-wrapper';
import './style.scss'
import Button from '../../button'

const EditWork = (props) => {
	const {handleUpdate, handleDelete, itemId } = props
	
	const [value, setValue] = useState({
		workName: '',
		comment: '',
	})

	const onChange = (e) => {
		const {id, value} = e.target		
		setValue(prevState => ({
			...prevState,
			[id]: value,
		}))		
	}	

	useEffect(() =>{
		if(itemId) {
			setValue(prevState => ({
				...prevState,
				workName: itemId.workName,
				comment: itemId.comment,
			}))
		}
	}, [itemId])
	
	return (
		<div className='edit-work'>
			<div className='content'>
				<div className='content-body'>
					<div className='content-header'>
						<h1>редактировать</h1>
					</div>
					<div className='content-main'>
						<div className="holder">
							<label htmlFor="workName">работа</label>
							<input 
								id='workName' 
								type="text" 
								value={value.workName}
								onChange={onChange}
								/>						
						</div>
						<div className="holder">
							<label htmlFor="comment">комментарии</label>
							<textarea 
								id="comment" 									
								value={value.comment}
								onChange={onChange}>
							</textarea>
						</div>						
					</div>
					<div className='content-footer'>						
						<div className='holder'>
							<Button handleClick={() => handleUpdate(value)}>
								отправить
							</Button>
						</div>	
						<div className='holder'>
							<Button handleClick={handleDelete}>
								удалить
							</Button>
						</div>																
					</div>						
				</div>
			</div>
		</div>
	);
};

export default modalWrapper(EditWork);