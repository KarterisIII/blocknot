import React from 'react';
import { checkDate } from '../../../../config';
import { useGetAllTypeWorkQuery } from '../../../../features/type-work/typeWorkApiSlice';
import tabelWrapper from '../../../hoc/tabel-wrapper';

const TypeWorkItem = (props) => {
	const {index, item, handleClick} = props

	const {typeWork} = useGetAllTypeWorkQuery('getTypeWork', {
		selectFromResult: ({data}) => ({
			typeWork: data?.entities[item]
		})
	})

	return (
		<div title='подробнее' className="table-line">
			<div className="item description box">{index + 1}</div>
			<div className="item description box">{checkDate(typeWork?.creationDate)}</div>
			<div className="item description box">{typeWork?.workName}</div>
			<div className="item description box">{checkDate(typeWork?.editDate)}</div>			
			<div className="item description box">{typeWork?.point}</div>
			<div 
				onClick={() => handleClick('editTypeWork')} 
				className="item description box">редактировать</div>
			<div 
				onClick={() => handleClick('deleteTypeWork', typeWork.id)} 
				className="item description box">удалить</div>			
		</div>
	);
};

export default tabelWrapper(TypeWorkItem);