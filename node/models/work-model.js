import {Schema, model, Types} from 'mongoose';

const WorkSchema = new Schema(
	{
		workName: {
			type: String,
			required: true
		},
		comment: {
			type: String,
			required: true
		},
		date: {
			type: Date, 
			default: Date.now
		},
		user: {
			type: Types.ObjectId,
			ref: 'User',
		},
		point: {
			type: Number			
		},
		optics: {
			type: Number,
			default: 0
		},
		copper: {
			type: Number,
			default: 0
		},
		editDate: {
			type: Date,
			default: Date.now
		},
		workDone: {
			type: Boolean,
			default: false
		},
		userId: [{ 
			type:Types.ObjectId,
			ref: 'User'

		}]
	},
	{
		timeseries: true,
	}
)

export default model('Work', WorkSchema)