const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail')

const giveawayResultSchema = new Schema({
	winnerEmail: {
		type: String,
		maxLength: 64,
		minLength: 3,
		validate: [ isEmail, 'Invalid email' ]
	},
	winningNumbers: {
		type: Number,
		min: 1
    },
    winnerInfo: {
        fullname: String,
        address: String,
        phone: String
    },
});

const giveawaySchema = new Schema({
	byUser: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		index: true
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		index: true,
		required: true
	},
	title: {
		type: String,
		lowercase: true,
		trim: true,
		required: true
	},
	description: {
		type: String,
		lowercase: true,
		trim: true,
		required: true
	},
	gift: {
		image: {
			type: String,
			required: true
		},
		title: {
			type: String,
			lowercase: true,
			trim: true,
			required: true
		}
	},
	begin: {
		required: true,
		type: Date,
	},
	end: {
		type: Date,
	},
	numParticipants: {
		required: true,
		type: Number,
		min: 1
	},
	result: {
		type: giveawayResultSchema,
		default: null
	}
});

module.exports.giveawayResultSchema = giveawayResultSchema
module.exports = model('Giveaway', giveawaySchema);