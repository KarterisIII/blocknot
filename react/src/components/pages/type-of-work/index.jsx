import React from 'react';
import './style.scss'
const TypeOfWork = () => {

	const [change, setChange] = React.useState({
		nameWork: 'наименование работы',
		points: 'баллы за работу',
	})
	const [value, setValue] = React.useState({
		nameWork: '',
		points: '',
	})

	const onChange = (e) => {
		const {id, value} = e.target		
		setValue(prevState => ({
			...prevState,
			[id]: value,
		}))	
		setChange(prevState => ({
			...prevState,
			[id]: value,
		}))
	}

	return (
		<div className='type-work'>
			<div className="content">
				<div className="body">
					<div className="header">
						<div className="title description">
							создание вида работы
						</div>
					</div>
					<div className="main">
						<div className="main-box">
							<div className='holder'>
								<label htmlFor="nameWork">{change.nameWork}</label>
								<input 
									id='nameWork' 
									value={value.nameWork}
									onChange={onChange}
									type="text" />
							</div>
						</div>
						<div className="main-box">
							<div className='holder'>
								<label htmlFor="points">{change.points}</label>
								<input 
									id='points' 
									value={value.points}
									onChange={onChange}
									type="number" 
									step="0.5"
									/>
							</div>
						</div>
					</div>
					<div className="footer">
						<div className="footer-box">
							<div className="button">
								<button>
									создать
								</button>
							</div>
							<div className="button">
								<button>
									отмена
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>			
		</div>
	);
};

export default TypeOfWork;