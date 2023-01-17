import React from 'react';



const index = (props) => {
	const {headTable} = props
	
	return (
		<div className="table-header">
			<div className="table-line">
				{headTable().map((line, idx) => {					
					return <div key={idx} className="item description box">{line}</div>
				})}
			</div>
		</div>						
	);
};

export default index;