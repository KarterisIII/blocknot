import {Schema, model, Types} from 'mongoose';
import workModel from './work-model.js';

const UserSchema = new Schema(
	{	
		login: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		patronymic: {
			type: String,
			default: 'отсудствует'

		},
		education: {
			type: Boolean,
			default: false
		},
		experience: {
			type: String,
			default: new Date
		},
		seniorDriver: {
			type: Boolean,
			default: false
		},
		salary: {
			type: Number,
			default: 13000
		},
		driver: {
			type: Boolean,
			default: false
		},
		welder: {
			type: Boolean,
			default: false
		},
		exams: {
			type: Number,
			default: 0
		},
		role: {
			type: Number,
			default: 1
		},
		date: {
			type: Date, 
			default: Date.now
		},		
		avatar: String,
		work: [{
			type: Types.ObjectId,
			ref: 'Work',
		}]
	},
	{
		timeseries: true,
	}
)

export default model('User', UserSchema)