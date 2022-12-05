import React, { useState } from 'react'
import { 
	useDeleteWorkMutation, 
	useGetWorksByUserIdQuery, 
	useUpdateWorkMutation } from '../../../../features/work/workApiSlice';
import WorkItem from '../../../tabel/body/work';
import EditWork from '../../../edit/work'


const index = (props) => {
	const {headTable, id} = props
	
	const [active, setActive] = useState(false)
	const [itemId, setItemId] = useState(null)
	const [cancel, setCansel] = useState(false)	
	const [message, setMessage] = useState(false)
	
	const handleClick = (user) => {			
		setActive(true)
		setItemId(user)
	}
	
	const {
		data, 
		isLoading
	} = useGetWorksByUserIdQuery(id, {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true
	})

	const [deleteWork] = useDeleteWorkMutation()
	const [updateWork] = useUpdateWorkMutation()	
	
	const deleteItem = async () => {		
	await deleteWork(itemId.id).unwrap()
			.then(payload => {
				setMessage(`${payload.msg}`)
				let messageItem, messageTimer	
				if (!message) {										
					messageTimer = setTimeout(() => {	
						setCansel(false)			
						setActive(false)
						setItemId(null)
					}, 500)
					messageItem = setTimeout(() => {				
						setMessage(false)			
					}, 1000)
				} else {
					clearTimeout(messageItem)
					clearTimeout(messageTimer)
				}				
			})
			.catch((error) => console.error('rejected', error))
	}

	const updateItem = async (workData) => {		
		await updateWork({...workData, id: itemId.id}).unwrap()
		.then(payload => {
			setMessage(`${payload.msg}`)
			console.log(payload)
			let messageItem, messageTimer	
			if (!message) {										
				messageTimer = setTimeout(() => {	
					setCansel(false)			
					setActive(false)
					setItemId(null)
				}, 1000)
				messageItem = setTimeout(() => {				
					setMessage(false)			
				}, 1500)
			} else {
				clearTimeout(messageItem)
				clearTimeout(messageTimer)
			}
		})
		.catch((error) => console.error('rejected', error))
	}

	
	return (
		<>			
			<EditWork
				cancel={cancel}
				active={active}
				setCansel={setCansel}
				setActive={setActive}
				functionUpdate={updateItem}
				functionDelete={deleteItem}
				message={message}
				itemId={itemId}	/>
			<WorkItem
				data={data} 
				isLoading={isLoading} 
				headTable={headTable}
				handleClick={handleClick} />			
		</>
	);
};

export default index;