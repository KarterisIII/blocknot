import React from 'react';
import './style.scss'

const AddWork = () => {	

	const [change, setChange] = React.useState({
		nameWork: 'выполненна работа',
		comment: 'коментарии',
	})
	const [value, setValue] = React.useState({
		nameWork: '',
		comment: '',
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
							добавить работу
						</div>
					</div>
					<div className="main">
						<div className="main-box">
							<div className="name-work-select">
								<label className='description' htmlFor="country">наименование работ</label>
								<select name="country" id="country">
									<option value="2">настройка роутера</option>
									<option value="1">обжать пачкорд</option>
									<option value="0">замена сетевой</option>
									<option value="3">замена кабеля</option>
									<option value="4">пайка волокна</option>
									<option value="5">перенос оптики</option>
								</select>
							</div>													
						</div>
						<div className="main-box">
							<div className="comment-textarea">
								<div className="name-textarea description">
									коментарии
								</div>
								<textarea></textarea>
							</div>							
						</div>
						<div className="main-box">
							<div className="points">
								<label htmlFor="points">м</label>
								<input id='points' type="number" />
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

export default AddWork;