import React, { useState } from 'react';
import { useCreateWorkMutation } from '../../../features/work/workApiSlice';
import Button from './../../button/index';
import './style.scss'

const index = (props) => {
	const {userId, handleClose} = props
	const [createWork] = useCreateWorkMutation()
	const [value, setValue] = useState({
		workName: '',
		comment: 'выполняеться'
	})

	const onChange = (e) => {
		const {id, value} = e.target		
		setValue(prevState => ({
			...prevState,
			[id]: value,
		}))		
	}

	const handleClick = async () => {
		await createWork({...value, userId}).unwrap()
		.then(() => {
			handleClose()
			setValue({
				workName: '',
				comment: 'выполняеться'
			})
		})
		.catch((error) => console.error('rejected', error))		
	}

	return (
		<div className='work'>
			<div className='content'>
				<div className="content-body">
					<div className="content-header">
						<h1>
							Задание
						</h1>
					</div>
					<div className="content-main">
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
									onChange={onChange}></textarea>
						</div>
					</div>
					<div className="content-footer">
						<div className='holder'>
							<Button handleClick={handleClick} >
								добавить
							</Button>
						</div>
						<div className='holder'>
							<Button handleClick={handleClose}>
								отмена
							</Button>
						</div>
					</div>
				</div>				
			</div>			
		</div>
	);
};

export default index;