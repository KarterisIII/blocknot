export default class WorkDto {
	id
	workName
	comment
	date
	user
	point
	workDone
	userId
	optics
	copper
	editDate

	constructor(model) {
		this.id = model._id
		this.workName = model.workName
		this.comment = model.comment
		this.date = model.date
		this.point = model.point
		this.user = model.user
		this.userId = model.userId
		this.workDone = model.workDone
		this.copper = model.copper
		this.optics = model.optics
		this.editDate = model.editDate
	}

}