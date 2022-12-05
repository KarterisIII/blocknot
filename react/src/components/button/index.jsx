import './style.scss'

const Button = (props) => {
	const {handleClick, children} = props
	return (
		<div className="button">
			<button onClick={handleClick}>{children}</button>
		</div>
	);
};

export default Button;