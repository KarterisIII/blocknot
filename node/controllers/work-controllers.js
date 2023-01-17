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
			const {workId, usersId, comment, optics, copper, workDone} = req.body
			const {id} = req.user	
						
			const workData = await workService.createWork(				
				workId, usersId, comment, optics, copper, workDone, id								
			)
			
			return res.json({msg:`работа ${workData.workName} добавлена`})
		} catch (error) {
			next(error)
		}
	}
	async updateWork(req, res, next) {
		try {
			const {workId, usersId, comment, optics, copper, workDone} = req.body	
				console.log(req.body)			
			const work = await workService.updateWork(
				workId, usersId, comment, optics, copper, workDone			
			)
			
			return res.json({msg:`работа ${work.workName} обнавлена`})
		} catch (error) {
			next(error)
		}
	}
	async deleteWork(req, res, next) {
		try {
			const {userId} = req.body
			const {id} = req.params
			
			const work = await workService.deleteWork(
				id, userId
			)
			return res.json({msg: `Работа ${work.workName} удалена`})
		} catch (error) {
			next(error)
		}
	}
}