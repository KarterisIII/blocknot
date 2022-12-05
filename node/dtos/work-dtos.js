export default class WorkDto {
	id
	workName
	comment
	date
	user
	userId

	constructor(model) {
		this.id = model._id
		this.workName = model.workName
		this.comment = model.comment
		this.date = model.date
		this.user = model.user
		this.userId = model.userId
	}

}