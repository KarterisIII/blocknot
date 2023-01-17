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

	async getUsers(userId) {
		const users = await userModel.find({_id: {$all: userId}})

		return users
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
		
		return user
	}

	async deleteUser(id) {
		const user = await userModel.findByIdAndDelete({ _id: id})
		
		if(!user) {
			throw ApiError.BadRequest('Пользователя не существует')
		}

		await workModel.updateMany({userId: id}, {$pull: {userId: id}})

		return user
	}
}