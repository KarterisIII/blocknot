import TypeWorkService from '../service/type-work-service.js';

const typeWorkService = new TypeWorkService()

export default class TypeWorkController {

	async getAllTypesWorks(req, res, next) {
		try {
			const typesWorks = await typeWorkService.getAllTypesWorks()

			res.json(typesWorks)
		} catch (error) {
			next(error)
		}
	}

	async createTypeWork(req, res, next) {
		try {
			const {workName, point} = req.body
			
			const typeWork = await typeWorkService.createTypeWork(workName, point)
			return res.json({msg: `Вид работы ${typeWork.workName} добавленно`})
		} catch (error) {
			next(error)
		}
	}

	async updateTypeWork(req, res, next) {
		try {
			const {id} = req.params
			const {
				workName,
				point,
				editDate,
			} =req.body

			const typeWorkData = {
				workName,
				point,
				editDate
			}

			const typeWork = await typeWorkService.updateTypeWork(id, typeWorkData)
			return res.json({msg: `тип работы ${typeWork.workName} обновлена`})
		} catch (error) {
			next(error)
		}
	}
	async deleteTypeWork(req, res, next) {
		try {
			const id = req.params.id
			const typeWork = await typeWorkService.deleteTypeWork(id)
			res.json({msg: `тип работы ${typeWork.workName} удалено`})
		} catch (error) {
			
		}
	}
}