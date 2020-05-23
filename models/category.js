const {Schema, model} = require('mongoose')

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
})

module.exports = model('Category', categorySchema)