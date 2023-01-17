import React from 'react';
import { checkDate } from '../../../../config';
import { useGetAllTypeWorkQuery } from '../../../../features/type-work/typeWorkApiSlice';
import tabelWrapper from '../../../hoc/tabel-wrapper';

const TypeWorkItem = (props) => {
	const {index, item, handleClick, screenWidth} = props

	const {typeWork} = useGetAllTypeWorkQuery('getTypeWork', {
		selectFromResult: ({data}) => ({
			typeWork: data?.entities[item]
		})
	})	

	return (
		<div className="table-line">
			<div className="item box">{index + 1}</div>
			{screenWidth < 767
				? null
				: <div className="item box">{checkDate(typeWork?.creationDate)}</div>}
			<div 
				title='редактировать'
				onClick={() => handleClick('updateTypeWork', typeWork)}
				className="item box link-item">{typeWork?.workName}</div>			
			{screenWidth < 767
				? null
				: <div className="item box">{checkDate(typeWork?.editDate)}</div>}			
			<div className="item box">{typeWork?.point}</div>
			<div 
				title='удалить'
				onClick={() => handleClick('deleteTypeWork', typeWork.id)} 
				className="item box link-item">удалить</div>			
		</div>
	);
};

export default tabelWrapper(TypeWorkItem);