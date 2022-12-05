import userModel from '../models/user-model.js'
import workModel from '../models/work-model.js'
import ApiError from '../exceptions/api-error.js'
import WorkDto from './../dtos/work-dtos.js';


export default class WorkService {
	async getWorksByUserId(id) {
		const works = await workModel.find({userId: id}).exec()
		
		const worksDto = works.map(work => new WorkDto(work))
		
		return worksDto

	}
	async createWork(workName, comment = 'выполняеться', id, userId ) {
		
		const userData = await userModel.findById({ _id: userId})

		if(!userData) {
			throw ApiError.BadRequest('Пользователя не существует')
		}

		const work = await workModel.create({
			workName,
			comment,
			user: id,
			userId
		})

		await userModel.findByIdAndUpdate({_id: userId}, {
			$push: {work: work._id}
		})

		await work.save()
		return work
	}
	async updateWork(id, workName, comment ) {
		
		const work = await workModel.findByIdAndUpdate({
			_id: id,
		},
		{
			workName: workName,
			comment: comment
		})
		
		if(!work) {
			throw ApiError.BadRequest('Работы не существует')
		}

		return work
	} 

	async deleteWork(id) {
		
		const work = await workModel.findByIdAndDelete({_id: id})

		if(!work){
			throw ApiError.BadRequest('Работы не существует')
		}

		return work
	}
}