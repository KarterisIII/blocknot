import { clearMessage, sendMessageAnser, sendMessageError } from '../features/message/messageSlice'
import { closeModal } from '../features/modal/modalSlice'

export const checkDate = (data) => {
	
	const answer = new Date(data).toLocaleDateString()
	return answer
}

export const getZero = (date) => {
	if (date >= 0 && date < 10) {
		return `0${date}`
	} else {
		return date
	}
} 

export const userDate = (date) => {
	const t = Date.parse(new Date()) - Date.parse(date)
	const year = Math.floor(t / (1000 * 60 * 60 * 24 * 30 * 12))
	const month = Math.floor(t / (1000 * 60 * 60 * 24 * 30) % 12)	
	let answer
	
	if (year >= 5) {
		answer = `${year}л. ${month}м.`
	} else {
		answer = `${year}г. ${month}м.`
	}
	
	return answer
}

export const checkBool = (data) => {	
	const answer = data ? 'да' : 'нет'
	return answer
}

export const checkNum = (data) => {
	const answer = data ? data : 13000
	return answer
}

export const catchMessage = async (dispatch, queryFulfilled) => {
	try {
		const { data } = await queryFulfilled
		dispatch(sendMessageAnser(data.msg))
		setTimeout(() => {
			setTimeout(() => {
				dispatch(clearMessage())
			}, 1300)
			dispatch(closeModal())
		}, 1000)
	} catch (err) {
		dispatch(sendMessageError(err.error.data))                    
	}	
}

export const getSheetData = (data, header) => {
    const fields = Object.keys(data[0]);
    const sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
}