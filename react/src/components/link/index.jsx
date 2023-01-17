import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'

const LinkButton = (props) => {
	const {link, children} = props
	return (
		<Link to={link} className='link-botton'>
			{children}
		</Link>
	);
};

export default LinkButton;