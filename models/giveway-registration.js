const {Schema, model} = require('mongoose')

const giveawayRegistrationSchema =  new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 64,
        minLength:3,
        validate: [isEmail, 'invalid email']
    },
    luckyNumber: {
        type: Number,
        required: true
    },
    giveAwayId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    }
})

module.exports = model('GiveawayRegistration', giveawayRegistrationSchema)