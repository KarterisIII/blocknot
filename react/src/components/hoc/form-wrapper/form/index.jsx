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
		
	return (
		<div className="content">
			<div className="content-body">
				<div className="content-header">
					<h1>{title}</h1>					
				</div>
				<div className="content-main">
					{
						!message
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