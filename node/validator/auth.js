import {body} from 'express-validator'

export const registrationValidator = [
	body('login', 'Логин должен состаять от 3 до 12 символов').isLength({min: 3, max: 12}),
	body('password', 'Пароль должен быть минимум 8 символов').isLength({min: 8}),
	body('username', 'укажите имя работника').isLength({min: 3}),
	body('surname', 'укажите фамилию работника').isLength({min: 3}),
]

export const typeWorkValidator = [
	body('workName', 'тип работ не должен быть пустым').not().isEmpty().trim().escape(),
	body('point', 'баллы за работу не должен быть пустым').not().isEmpty().trim().escape(),
]

