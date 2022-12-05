import { useState } from 'react';
import Loading from '../../loading'
import TableHeader from '../../tabel/header'
import RemoveItem from '../remove-item';
import Modal from './../../modal/Modal';

const initialState = {
	error: {
		error: '',
		anser: '',
	},
	modal: {
		active: false,
		itemId: null
	}
 }

const tabelWrapper = (View) => {

	return (props) => {	
		
		const {
			isLoading, 
			data, 
			headTable,
			handleClick,
			} = props		
			
		return (			
			<div className='table'>				
				<TableHeader headTable={headTable}/>
				<div className="table-body">					
					{ isLoading
						? <Loading/>
						: data.ids.map((itemId, index) => {							
							return 	<View 
										dataId={data}
										handleClick={handleClick} 
										index={index} 
										key={itemId} 
										item={itemId}/>
						})
					}	
				</div>
			</div>
		);
	}
	
};

export default tabelWrapper