const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  hr: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // type:Buffer,
    // contentType:String,

  },
},{ timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
