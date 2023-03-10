const mongoose = require('mongoose')

const Schema = mongoose.Schema

const empSchema = new Schema({

name: {
    type: String,
    required: true 
},
phone: {
    type: Number,
    required: true
  },
email: {
    type: String,
    required: true
},
address: {
    type: String,
    required: true
},
user_id: {
  type: String,
  required: true
}

}, { timestamps: true })

module.exports = mongoose.model('Emp', empSchema)