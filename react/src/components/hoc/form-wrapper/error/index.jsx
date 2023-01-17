import React from 'react';
import './style.scss'

const MessageError = (props) => {
	const {message} = props
	return (
		<div className='message-error'>
			<div className='message-error__body'>
				<p>{message.message}</p>
				{message.errors?.map((error, idx) => {
					return (
						<p key={error.param}>{error.msg}</p>
					)
				}) }				
			</div>
		</div>
	);
};

export default MessageError;