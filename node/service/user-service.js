import ApiError from '../exceptions/api-error.js'
import userModel from '../models/user-model.js'
import workModel from '../models/work-model.js';
import UserDto from './../dtos/user-dtos.js';

export default class UserService {	

	async getAllUsers() {
		const users = await userModel.find().populate({
			path: 'work',
			select: '-password' }).exec()
		const usersDto = users.map(user => new UserDto(user))		
		return usersDto
	}

	async getOneUser(id) {
		const user = await userModel.findById({_id: id}).populate('work').exec()
		if(!user) {
			throw ApiError.BadRequest('Пользователя не существует')
		}
		const userDto = new UserDto(user)
		return userDto
	}

	async updateUser(id, userData) {
		
		const user = await userModel.findByIdAndUpdate({_id: id}, userData, {new: true})
		const userDto = new UserDto(user)
		return userDto
	}

	async deleteUser(id) {
		const user = await userModel.findByIdAndDelete({ _id: id})
		
		if(!user) {
			throw ApiError.BadRequest('Пользователя не существует')
		}

		await workModel.deleteMany({_id: {$in: user.work}})
		return user
	}
}