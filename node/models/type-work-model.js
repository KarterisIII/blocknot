import {Schema, model, Types} from 'mongoose';

const TypeWorkSchema = new Schema(
	{
		workName: {
			type: String,
			unique: true,
			require: true,
		},
		point: {
			type: Number,
			require: true
		},
		creationDate: {
			type: Date,
			default: Date.now
		},
		editDate: {
			type: Date,
			default: Date.now
		}
	},
	{
		timeseries: true
	}
)

export default model('TypeWork', TypeWorkSchema)