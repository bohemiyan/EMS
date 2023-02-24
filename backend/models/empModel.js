const mongoose = require('mongoose')

const Schema = mongoose.Schema

const empSchema = new Schema({
//   ID: {
//     type: Number,
//     required: true,
//     unique: true
// },
name: {
    type: String,
    required: true 
},
// photo: {
//   type: Buffer,
//   contentType: String,
// },
// createdAt:{
// type: Date,
// default: Date.now()
// },
phone: {
    type: Number,
    required: true
  },
email: {
    type: String,
    required: true
},
gender: {
    type: String,
    required: true
},
user_id: {
  type: String,
  required: true
}

}, { timestamps: true })

module.exports = mongoose.model('Emp', empSchema)