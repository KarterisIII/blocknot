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
		userId: Types.ObjectId
	},
	{
		timeseries: true,
	}
)

export default model('Work', WorkSchema)