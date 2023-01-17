import React from 'react';
import addWorkWrap from './../../hoc/form-wrapper/add-work-wrap/addWorkWrap';
import Button from '../../button';
import './style.scss'


const Work = (props) => {
	const {
		valueObj,
		workId,
		elemArr, 
		searchArr,
		onChange, 
		handleaddWorker, 
		deleteElem,
		handleChange,
		handleSearchValue} = props	
	
	const {value, checkbox} = valueObj
	
	return (
		<div className='work'>			
			<div className='work-box'>
				<label 
					className='edit-label description' 
					htmlFor="workName">Наименование работы</label>
				{workId
					? 	<div className='work-name'>{value.workName}</div>
					:	<input 
							className='edit-text' 
							type="text" 
							id="workName" 
							placeholder="поиск тип работ..."
							value={value.workName || ''}
							onChange={onChange} />
				}
				<div className='work-list-wrap'>
					<div className='work-list'>
						{searchArr?.workName?.map(item => {														
							return (
								<div
									key={item.id}
									onClick={() => 
									handleSearchValue(item.workName, item.id, 'workName')} 
									className='work-list-item'>
									{item.workName}								
								</div>							
							)
						})}
					</div>
				</div>							
			</div>	
			{	elemArr.map((item, idx) => 
					<div key={item} className='work-box'>
						<label 
							onClick={() => deleteElem(item, value?.[`${item}`])}
							className='edit-label description close-elem' 
							htmlFor={item}>Работник номер {idx + 1}</label>
						<input 
							className='edit-text' 
							type="text" 
							id={item} 
							placeholder="поиск работника..."
							value={value?.[`${item}`] || ''}
							onChange={onChange} />
						<div className='work-list-wrap'>
							<div className='work-list'>
								{searchArr?.[`${item}`]?.map(user => {
									return (
										<div
											key={user.id}
											onClick={() => handleSearchValue(user.surname, user.id, item) } 
											className='work-list-item'>
											{user.surname} {user.username}								
										</div>							
									)
								})}
							</div>
						</div>							
					</div>
				) 
			}
			<Button handleClick={() => handleaddWorker()}>
				работник+
			</Button>
			<div className='work-box'>						
				<label 
					className='edit-label description'
					htmlFor='comment'>
					Комментарии
				</label>
				<textarea 
					placeholder='комментарии к работе...'
					className='edit-textarea'
					value={value.comment || ''}
					onChange={onChange}
					name="comment" 
					id="comment" 
					cols="30" 
					rows="10">
				</textarea>
			</div>	
			<div className="edit-holder">
				<div className="edit-box">
					<label 
						className='edit-label description' 
						htmlFor="optics">оптический кабель</label>
					<input 
						className='edit-text'
						type="number" 
						id="optics"
						placeholder="Тип работы"
						value={value?.optics || ''}
						onChange={onChange} />
				</div>
				<div className="edit-box">
					<label 
						className='edit-label description' 
						htmlFor="copper">медный кабель</label>
					<input 
						className='edit-text'
						type="number" 
						id="copper" 
						placeholder="Балл за работу"
						value={value?.copper || ''}
						onChange={onChange} />
				</div>	
			</div>				
			<div className="work-box">
				<div className='description'>Работа выполнена</div>
				<label 
					className='edit-label' 
					htmlFor="workDone">
					<input	
						className='edit-checkbox'						 
						type="checkbox" 
						id="workDone"
						checked={checkbox?.workDone || false}
						onChange={handleChange}	/>
					<div className="edit-slider">
						<div className="edit-knob"></div>
					</div>
				</label>						
			</div>					
		</div>
	);
};

export default addWorkWrap(Work);