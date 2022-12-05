import React from 'react';
import './style.scss'

const MessageError = (props) => {
	const {message} = props
	console.log(message.errors)
	return (
		<div className='message-error'>
			<div className='message-error__body'>
				<p>{message.message}</p>
				{message.errors.map((error, idx) => {					
					return <p key={idx}><i>{error.msg}</i></p>
				}) }
			</div>
		</div>
	);
};

export default MessageError;