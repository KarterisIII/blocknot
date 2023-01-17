import formWrapper from '../../hoc/form-wrapper/wrapper/index';
import './style.scss'

const TypeWork = (props) => {
	const {valueObj, onChange, message} = props
	const {value} = valueObj
	const error = message.message ? 'edit-text error-message' : 'edit-text' 

	return (
		<div className='type-work'>				
			<div className="edit-holder">
				<div className="edit-box">
					<label 
						className='edit-label description' 
						htmlFor="workName">Тип работы</label>
					<input 
						className={error}
						type="text" 
						id="workName"
						name="workName" 
						placeholder="Тип работы"
						value={value.workName || ''}
						onChange={onChange} />
				</div>
				<div className="edit-box">
					<label 
						className='edit-label description' 
						htmlFor="point">Балл за работу</label>
					<input 
						className='edit-text'
						type="number" 
						id="point"
						name="point" 
						placeholder="Балл за работу"
						value={value.point || ''}
						onChange={onChange} />
				</div>	
			</div>		
		</div>
	);
};

export default formWrapper(TypeWork);