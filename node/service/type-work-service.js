import typeWorkModel from '../models/type-work-model.js'
import ApiError from '../exceptions/api-error.js'
import TypeWorkDto from '../dtos/type-work.js'

export default class TypeWorkService {
	async getAllTypesWorks() {
		const typesWorks = await typeWorkModel.find()

		const typesWorksDto = typesWorks.map(type => new TypeWorkDto(type))
		return typesWorksDto
	}

	async createTypeWork(workName, point) {
		
		const workNameData = await typeWorkModel.findOne({workName})
		if(workNameData) {
			throw ApiError.BadRequest(`Тип работы ${workNameData.workName} уже существует`)
		}
		const typeWorkData = await typeWorkModel.create({workName, point})

		await typeWorkData.save()
		return typeWorkData
	}

	async updateTypeWork(id, typeWorkData) {
		const typeWork = await typeWorkModel.findByIdAndUpdate(
			{_id: id}, 
			typeWorkData,
			{new: true} )
		const typeWorkDto = new TypeWorkDto(typeWork)
		return typeWorkDto
	}

	async deleteTypeWork(id) {
		const TypeWork = await typeWorkModel.findByIdAndDelete({_id: id})

		if(!TypeWork) {
			throw ApiError.BadRequest('Тип работы не существует')
		}

		return TypeWork
	}
}