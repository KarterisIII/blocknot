export default class TypeWorkDto {
	workName
	point
	creationDate
	editDate
	id

	constructor(model) {
		this.workName = model.workName
		this.point = model.point
		this.creationDate = model.creationDate
		this.editDate = model.editDate
		this.id = model._id
	}
}