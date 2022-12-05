import WorkService from '../service/work-service.js';
import ApiError from '../exceptions/api-error.js';

const workService = new WorkService()

export default class WorkControllers {
	async getWorksByUserId(req, res, next) {
		try {
			
			const id = req.params.id
			
			const works = await workService.getWorksByUserId(id)
			
			res.json(works)
		} catch (error) {
			next(error)
		}
	}
	async createWork(req, res, next) {
		try {
			
			const {workName, comment, userId} = req.body
			const {id} = req.user
						
			const workData = await workService.createWork(				
				workName,
				comment,
				id,
				userId				
			)
			return res.json({workData})
		} catch (error) {
			next(error)
		}
	}
	async updateWork(req, res, next) {
		try {
			const {workName, comment, id} = req.body	
					
			const work = await workService.updateWork(
				id,
				workName,
				comment,				
			)
			
			return res.json({msg:`работа ${work.workName} обнавлена`})
		} catch (error) {
			next(error)
		}
	}
	async deleteWork(req, res, next) {
		try {
			const {id} = req.params
			console.log(req.params)
			const work = await workService.deleteWork(
				id
			)
			return res.json({msg: `Работа ${work.workName} удалена`})
		} catch (error) {
			next(error)
		}
	}
}