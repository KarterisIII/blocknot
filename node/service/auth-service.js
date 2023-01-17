import userModel from '../models/user-model.js'
import bcrypt  from 'bcrypt'
import TokenService from './token-service.js'
import UserDto from '../dtos/user-dtos.js';
import ApiError from '../exceptions/api-error.js';

const tokenService = new TokenService() 

export default class AuthService {
	async registration(
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
		role) {
		const worcker = await userModel.findOne({login})
		if(worcker) {
			throw ApiError.BadRequest(`Пользователь ${login} уже существует`)
		}
		const hashPassword = await bcrypt.hash(password, 3)
		const user = await userModel.create(
			{
				login,
				password: hashPassword,
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
			}
		)

		await user.save()

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens( {...userDto})
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return user
	}

	async login(login, password) {
		const user = await userModel.findOne({login}).exec()
		if(!user) {
			throw ApiError.BadRequest('Пользователя не существует')
		}
		const passwordHash = await bcrypt.compare(password, user.password)
		if(!passwordHash) {
			throw ApiError.BadRequest('Неправельный пароль')
		}		
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({...userDto})
		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return {...tokens, user: userDto }
	}
	
	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		
		if(!refreshToken) {
			
			throw ApiError.UnauthorizedError()
		}
		
		const userData =  tokenService.validateRefreshToken(refreshToken)
		const tokenFromDB = await tokenService.findToken(refreshToken)
		if(!userData || !tokenFromDB) {
			throw ApiError.UnauthorizedError()
		}

		const user = await userModel.findById(userData.id)

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({...userDto})
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {...tokens, user: userDto }
	}
}