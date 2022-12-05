export default class UserDto {
	login; 
	username; 
	surname; 
	patronymic;
	driver;
	education;
	experience;
	exams;
	welder;
	role;
	id;
	salary;
	date;
	seniorDriver;
	work;

	constructor(model) {
		this.login = model.login
		this.id = model._id
		this.username = model.username
		this.surname = model.surname
		this.patronymic = model.patronymic
		this.driver = model.driver
		this.education = model.education
		this.experience = model.experience
		this.exams = model.exams
		this.role = model.role
		this.welder = model.welder
		this.salary = model.salary
		this.seniorDriver = model.seniorDriver
		this.work = model.work
		this.date = model.date
	}
}