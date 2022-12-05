export const checkDate = (data) => {
	
	const answer = new Date(data).toLocaleDateString()
	return answer
}

const getZero = (date) => {
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
		answer = `${year} лет. ${month} мес.`
	} else {
		answer = `${year} год. ${month} мес.`
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