import React from 'react';
import { checkDate } from '../../../../config';
import tabelWrapper from '../../../hoc/tabel-wrapper';

const WorkItem = (props) => {
	const {handleClick, item, dataId, index, screenWidth} = props

	const data = dataId?.entities[item]
	const classWork = data.workDone ? 'table-line' : 'table-line not-done'
	
	return (
		<div title='подробнее' className={classWork}>
			<div className="item box">{index +1}</div>
			{screenWidth < 767 ? null : <div className="item box">
				{checkDate(data.date)}
			</div>}
			<div
				onClick={() => handleClick('updateWork', data)} 
				className="item box link-item">
				{data.workName}
			</div>
			<div className="item box">{Math.trunc( data.point * 100 ) / 100}</div>
			{screenWidth < 767 
				? null 
				: <div className="item box">{checkDate(data.editDate)}</div>}
			<div className="item box">{data.comment}</div>
			<div 
				onClick={() => handleClick('deleteWork', item)}
				className="item box link-item">удалить</div>
		</div>
	);
};

export default tabelWrapper(WorkItem);