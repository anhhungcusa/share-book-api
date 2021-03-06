const {Schema, model} = require('mongoose')
const isEmail = require('validator/lib/isEmail')

const giveawayRegistrationSchema =  new Schema({
    email: {
        type: String,
        required: true,
        maxLength: 64,
        minLength:3,
        validate: [isEmail, 'invalid email']
    },
    luckyNumber: {
        type: Number,
        required: true
    },
    giveawayId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    createdAt: {
        type: Date
    }
})

module.exports = model('GiveawayRegistration', giveawayRegistrationSchema)