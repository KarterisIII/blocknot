import React from 'react';
import * as XLSX from 'xlsx'
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import ReportSearch from './../search';
import { useAppDispatch, useAppSelector } from './../../../../../hooks/hooks';
import { clearInput, inputObject, inputText } from './../../../../../features/input/inputSlice';
import {useGetUsersQuery} from '../../../../../features/users/usersApiSlice'
import { reportSearch, usersSearch } from '../../../../../features/search/seachSlice';
import {headUsersReport} from '../../../../../service/headTable'
import UserReport from './../users';
import Button from './../../../../button/index';

const ReportPage = () => {
	const dispatch = useAppDispatch()
	const {value} = useAppSelector(inputObject)
	const users = useAppSelector(usersSearch)
	const userList = useGetUsersQuery()

	const s2ab = (s) => {
		const buf = new ArrayBuffer(s.length)
		const view = new Uint8Array(buf)
		for (let i = 0; i !== s.length; ++i) {
			view[i] = s.charCodeAt(i)
		}
		return buf
	}

	const workbook2blob = (workbook) => {
		const wopts = {
			bookType: 'xlsx',
			type: 'binary'
		}
		const wbout = XLSX.write(workbook, wopts)
		const blob = new Blob([s2ab(wbout)], {
			type: 'application/octet-strem'
		})
		return blob
	}

	const onChange = (e) => {
	const {id, value} = e.target
	dispatch(inputText({id, value}))
	}

	const search = () => {
	dispatch(reportSearch(value))
	dispatch(clearInput())
	}
	
	const exportXlsx = () => {
		downloadXlsx().then((url) => {
			console.log(url)
			const downloadNode = document.createElement('a')
			downloadNode.setAttribute('href', url)
			downloadNode.setAttribute('download', 'file.xlsx')
			downloadNode.click()
			downloadNode.remove()
		})
	}

	const downloadXlsx = () => {
		
		const title = [{
			A: 'Отчет по зарплате работников'
		}, {}]

		const tabel = [
			{
				A: 'Ф.И.О',
				B: 'Водитель',
				C: 'Стаж',
				D: 'Главный машины',
				E: 'Оклад',
				F: 'Паяльщик',
				G: 'Образование',
				H: 'Итого'
			}
		]

		users.forEach(user => {
			const username = `${user.surname} ${user.username} ${user.patronymic}`
			tabel.push({
				A: username,
				B: user.driver,
				C: user.experience,
				D: user.seniorDriver,
				E: user.salary,
				F: user.welder,
				G: user.education,
				H: user.sum
			})
		})

		const usersData = [...title, ...tabel]
		console.log(usersData)

		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet(usersData, {
			skipHeader: true
		})

		XLSX.utils.book_append_sheet(wb, ws, 'список работников')

		const workBook = workbook2blob(wb)

		const headerIndexes = []
		usersData.forEach((data, idx) => 
			data['A'] === 'Ф.И.О' 
			? headerIndexes.push(idx) 
			: null
		)
		const dataInfo = {
			titleCell: 'A2',
			titleRange: 'A1:H2',
			tbodyRange: `A3:H${usersData.length}`,
			theadRange: headerIndexes.length >= 1
				? `A${headerIndexes[0] + 1}:H${headerIndexes[0] + 1}`
				: null,
		}
		return addStyles(workBook, dataInfo)
	}

	const addStyles = (workBook, dataInfo) => {
		return XlsxPopulate.fromDataAsync(workBook).then(workbook => {
					workbook.sheets().forEach(sheet => {

						sheet.column('A').width(40)
						sheet.column('B').width(15)
						sheet.column('C').width(15)
						sheet.column('D').width(15)
						sheet.column('E').width(15)
						sheet.column('F').width(15)
						sheet.column('G').width(15)
						sheet.column('H').width(15)

						sheet.range(dataInfo.titleRange).merged(true).style({
							bold: true,
							horizontalAlignment: 'center',
							verticalAlignment: 'center'
						})
						sheet.range(dataInfo.tbodyRange).style({
							horizontalAlignment: 'center'
						})
						sheet.range(dataInfo.theadRange).style({
							fill: 'db3131',
							bold: true,
							fontColor: 'fefdfa'
						})
					})
					return workbook.outputAsync()
						.then(workBook => URL.createObjectURL(workBook))
				})
	}

	return (
		<div className='report-page'>
			<div className='container'>
				<div className="wrraper">
					<ReportSearch 
						value={value} 
						onChange={onChange}	
						search={search}/>
					<UserReport
						headTable={headUsersReport}
						users={users}						
					/>
					{
						users.length === 0
						? null
						: <Button handleClick={exportXlsx}>
							экспорт таблицы
						  </Button>
					}
					
				</div>
			</div>			
		</div>
	);
};

export default ReportPage;