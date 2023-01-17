import UserService from '../service/user-service.js'

const userService = new UserService()

export default class UserController {

	async getAllUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers()
			
			res.json(users)
		} catch (error) {
			next(error)
		}
	}
	async getUsers(req, res, next) {
		try {
			const {userId} = req.body
			
			const users = await userService.getUsers(userId)

			res.json(users)
		} catch (error) {
			next(error)
		}
	}
	async getOneUser(req, res, next) {
		try {
			const {id} = req.params
			const user = await userService.getOneUser(id)
			res.json(user)
		} catch (error) {
			next(error)
		}
	}
	async updateUser(req, res, next) {
		try {
			const {id} = req.params
			const {
				username, 
				surname, 
				patronymic,
				driver,
				education,
				experience,
				welder,
				role,
				salary,
				seniorDriver,
			} = req.body
			
			const userData = {
				username, 
				surname, 
				patronymic,
				driver,
				education,
				experience,
				welder,
				role,
				salary,
				seniorDriver,
			} 
			
			const user = await userService.updateUser(id, userData)
			console.log(user.surname)
			return res.json({msg:`пользователь ${user.surname} обнавлен`})
			
		} catch (error) {
			next(error)
		}
	}
	async deleteUser(req, res, next) {
		try {
			const id = req.params.id
			const user = await userService.deleteUser(id)
			res.json({msg: `работник ${user.surname} ${user.username} удален`})
		} catch (error) {
			next(error)
		}
	}
}