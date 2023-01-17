import userModel from '../models/user-model.js'
import workModel from '../models/work-model.js'
import ApiError from '../exceptions/api-error.js'
import WorkDto from './../dtos/work-dtos.js';
import typeWork from '../models/type-work-model.js'


export default class WorkService {
	async getWorksByUserId(id) {
		
		const works = await workModel.find({userId: id})
		
		const worksDto = works.map(work => new WorkDto(work))
		
		return worksDto

	}
	async createWork(
			workId, 
			usersId, 
			comment = 'выполняеться', 
			optics = 0 , 
			copper = 0, 
			workDone, 
			id) {	
		
		if(!workId) {
			throw ApiError.BadRequest('Тип работы не существует')
		}
		
		const typeWorkData = await typeWork.findById({_id: workId})

		if(!typeWorkData) {
			throw ApiError.BadRequest('Тип работы не существует')
		}
		const opCop = (optics / 0.5) + (copper/ 0.5)
		const num = typeWorkData.point + opCop
		const point = num / usersId.length
		
		const users = await userModel.find({ _id: {$in: usersId}})

		if(!users) {
			throw ApiError.BadRequest('Пользователя не существует')
		}
		const work = await workModel.create({
			workName: typeWorkData.workName,
			comment,
			point: point,
			workDone,
			user: id,
			userId: usersId,
			optics, 
			copper, 
		})
		await userModel.updateMany(
			{ _id: {$in: usersId} },
			{ $push: {work: work._id} }
		 )				
		await work.save()
		return work
	}
	async updateWork(workId, usersId, comment, optics, copper, workDone) {
		const workData = await workModel.findOne({_id: workId})

		if(!workData) {
			throw ApiError.BadRequest('Работы не существует')
		}

		const typeWorkData = await typeWork.findOne({workName: workData.workName})
		if(!typeWorkData) {
			throw ApiError.BadRequest('Работы не существует')
		}

		const opCop = (optics / 0.5) + (copper/ 0.5)
		const num = typeWorkData.point + opCop
		const point = num / usersId.length
		const work = await workModel.findByIdAndUpdate(
			{_id: workId},
			{
				comment,
				workDone,
				point,
				userId: usersId,
				optics, 
				copper,
				editDate: new Date()
			})
			
		return work
	} 

	async deleteWork(id, userId) {
		
		const workId = await workModel.findById({_id: id})
		let work;
		if(workId.userId.length > 1) {
			await workModel.updateOne({_id: id}, {$pull: {userId: userId}})
			const typeWorkData = await typeWork.findOne({workName: workId.workName})
			const workArr = await workModel.findById({_id: id})			
			const point = typeWorkData.point / workArr.userId.length			
			work = await workModel.findByIdAndUpdate({_id: id}, {point})
		} 

		work = await workModel.findByIdAndDelete({_id: id})
		
		if(!work){
			throw ApiError.BadRequest('Работы не существует')
		}

		return workId
	}
}