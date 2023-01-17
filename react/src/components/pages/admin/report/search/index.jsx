import React from 'react';
import Button from '../../../../button';
import './style.scss'

const ReportSearch = (props) => {
	const {value, search, onChange} = props
	return (
		<div className='report-search'>
			<div className="content">
				<div className="content-body">
					<div className='panel-box'>
						<div className="report-box">
						<label 
							className='report-label description' 
							htmlFor="startDate">C :</label>
						<input 
							className='edit-text'
							type="date" 
							id="startDate" 
							value={value.startDate || ''}
							onChange={onChange} 
							/>
						</div>
						<div className="report-box">
						<label 
							className='report-label description' 
							htmlFor="endDate">ДО :</label>
						<input 
							className='edit-text'
							type="date" 
							id="endDate"
							value={value.endDate || ''}
							onChange={onChange} 
							/>
						</div>
						<Button handleClick={search}>
							Поиск
						</Button>
					</div>	
				</div>
			</div>				
		</div>
	);
};

export default ReportSearch;