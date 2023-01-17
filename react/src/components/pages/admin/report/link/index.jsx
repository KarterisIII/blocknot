import React from 'react';
import LinkButton from './../../../../link/index';

const ReportLink = () => {
	return (
		<div className="content">
			<div className="content-body">
				<div className='panel-box'>
					<LinkButton link={'report'} children={'отчет'} />
				</div>				
			</div>
		</div>
				
	);
};

export default ReportLink;