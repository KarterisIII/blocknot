import React from 'react';
import { checkDate } from '../../../../config';
import tabelWrapper from '../../../hoc/tabel-wrapper';

const WorkItem = (props) => {
	const {handleClick, item, dataId, index} = props
	
	return (
		<div onClick={() =>{handleClick(dataId?.entities[item])}} title='подробнее' className="table-line">
			<div className="item description box">{index +1}</div>
			<div className="item description box">{checkDate(dataId?.entities[item].date)}</div>
			<div className="item description box">{dataId?.entities[item].workName}</div>
			<div className="item description box">{dataId?.entities[item].comment}</div>
			<div className="item description box">баллы</div>
		</div>
	);
};

export default tabelWrapper(WorkItem);