import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import Modal from '../../../modal/Modal';
import Form from '../form/index';
import Message from '../massege/index';
import { inputObject, inputText, inputCheckbox, clearInput} from '../../../../features/input/inputSlice';
import { workSearch, userSearch, arrSearch } from '../../../../features/search/seachSlice';
import { elemArr, 
	addWork,
	addWorker,	 
	deleteInput, 
	addWorkId, 
	addInput,} from '../../../../features/work/workFormSlice';
import { messageObj } from '../../../../features/message/messageSlice';

const addWorkWrap = (View) => {
	return (props) => {
		const {active, title, data} = props	
		const dispatch = useAppDispatch()
		const inputElementArr = useAppSelector(elemArr)
		const search = useAppSelector(arrSearch)	
		const value = useAppSelector(inputObject)
		const workId = useAppSelector(addWork)
		const workerId = useAppSelector(addWorker)
		const message = useAppSelector(messageObj)
		
		const onChange = (e) => {
			const {id, value} = e.target
			dispatch(inputText({id, value}))						
			if(id === 'workName') {
				dispatch(workSearch({value, id}))
			} else {
				dispatch(userSearch({value, id}))
			}								
		}		
		
		const handleChange = (e) => {	
			const {id, value} = e.target		
			dispatch(inputCheckbox({id, value}))									
		}

		const deleteElem = (id, value) => {	
			dispatch(deleteInput({id, value}))					
		}

		const handleaddWorker = () => {				
			dispatch(addInput())							
		}

		const handleSearchValue = (value, item, id) => {				
			dispatch(addWorkId({item, id, value}))	
		}

		const handleClick = async () => {	
			const usersId = workerId.filter((el,idx) => {
				return workerId.indexOf(el) === idx
			})			
			
			await data.functItem({workId, usersId, ...value}).unwrap()			
		}		
		
		return (
			<>
				<Modal active={active} handleClose={data?.handleClose}>
					{
						!message.anser
							? <Form	
								activeButton={workId}							
								message={message.error}
								title={title} 
								handleClose={data?.handleClose}
								handleClick={handleClick}>
								<View
									workId={workId}
									handleChange={handleChange}
									deleteElem={deleteElem}
									elemArr={inputElementArr}
									handleaddWorker={handleaddWorker}																			
									message={message.error}
									valueObj={value}
									searchArr={search}
									onChange={onChange}
									handleSearchValue={handleSearchValue}									
								/>
							</Form>
						: <Message							
							message={message.anser}/>
					}				
				</Modal>
			</>
		);
	}	
};

export default addWorkWrap;