import React from 'react';
import './style.scss'

const Message = (props) => {
	const {message} = props
	return (
		<div className='message'>
			<div className='message__body'>
				{message}
			</div>
		</div>
	);
};

export default Message;