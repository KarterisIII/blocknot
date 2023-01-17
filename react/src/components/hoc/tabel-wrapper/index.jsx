import { useState, useEffect } from 'react';
import Loading from '../../loading'
import TableHeader from '../../tabel/header'
import { useAppDispatch } from './../../../hooks/hooks';

const tabelWrapper = (View) => {

	return (props) => {	
		
		const {
			isLoading, 
			data, 
			headTable,
			handleClick,
			isEvent,
			changeIsEvent
			} = props	
			
		const dispatch = useAppDispatch()
		const screenWidth = window.screen.width	
		const head = () => {
			if (screenWidth < 767 && isEvent === false) {
				dispatch(changeIsEvent())
				headTable.splice(-3, 1) && headTable.splice(1, 1)
			}
			return headTable
		}			

		return (			
			<div className='table'>				
				<TableHeader headTable={head}/>
				<div className="table-body">					
					{ isLoading
						? <Loading/>
						: data?.ids.map((item, index) => {							
							return 	<View 
										screenWidth={screenWidth}
										dataId={data}
										handleClick={handleClick} 
										index={index} 
										key={item} 
										item={item}/>
						})
					}	
				</div>
			</div>
		);
	}
	
};

export default tabelWrapper