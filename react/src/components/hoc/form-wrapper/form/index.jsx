import React, { Children } from 'react';
import Button from './../../../button/index';
import MessageError from './../error/index';
import './style.scss'

const Form = (props) => {
	const {
		message,
		title, 
		children,		
		handleClick,
		handleClose} = props
		const classMessage = message.message ? 'content-body-error' : 'content-body'
	return (
		<div className="content">
			<div className={classMessage}>
				<div className="content-header">
					<h4>{title}</h4>					
				</div>
				<div className="content-main">
					{
						!message.message
						? null
						: <MessageError message={message} />
					}
					{children}
				</div>
				<div className="content-footer">
					<Button handleClick={handleClick} >
						Добавить
					</Button>
					<Button handleClick={handleClose}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Form;