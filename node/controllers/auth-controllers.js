import AuthService from '../service/auth-service.js'
import {validationResult} from 'express-validator'
import ApiError from '../exceptions/api-error.js'




const authService = new AuthService()

export default class AuthController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			}
			const {
				login,
				password,
				username, 
				surname, 
				patronymic,
				driver,
				education,
				experience,
				exams,
				salary,
				welder,
				role,
			} = req.body

			const userData = await authService.registration(
				login,
				password,
				username, 
				surname, 
				patronymic,
				driver,
				education,
				experience,
				exams,
				salary,
				welder,
				role,
			)
						
			return res.json({msg: `Работник ${userData.surname} ${userData.username} создан`})
			
		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const {login, password} = req.body
			const userData = await authService.login(login, password)
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})			
			return res.json(userData)
			
		} catch (error) {
			next(error)
		}
	}
	async logout(req, res, next) {
		try {
			const {refreshToken} = req.cookies
			const token = await authService.logout(refreshToken)
			res.clearCookie('refreshToken');
			return res.json(token)
			
		} catch (error) {
			next(error)
		}
	}
	async refresh(req, res, next) {
		try {
			
			const {refreshToken} = req.cookies
			// console.log(refreshToken)
			const token = await authService.refresh(refreshToken)
			res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})			
			return res.json(token)
			
		} catch (error) {
			next(error)
		}
	}	
}

