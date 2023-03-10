const Emp = require('../models/empModel')
const mongoose = require('mongoose')

// get all emps
const getEmps = async (req, res) => {
  const user_id = req.user._id
 
  const emps = await Emp.find({user_id}).sort({createdAt: -1})

  res.status(200).json(emps)
}

// get a single emp
const getEmp = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such emp'})
  }

  const emp = await Emp.findById(id)

  if (!emp) {
    return res.status(404).json({error: 'No such emp'})
  }
  
  res.status(200).json(emp)
}


// create new emp
const createEmp = async (req, res) => {
  const {name,phone,email,address} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!phone) {
    emptyFields.push('phone')
  }
  if(phone.length<10){
    emptyFields.push('phone')
    return res.status(400).json({ error: 'invalid phone number',emptyFields})
  }
  if(!email) {
    emptyFields.push('email')
  }
  if(!address) {
    emptyFields.push('address')
    
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const emp = await Emp.create({name,phone,email,address, user_id})
    
    res.status(200).json(emp)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a emp
const deleteEmp = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such emp'})
  }

  const emp = await Emp.findOneAndDelete({_id: id})

  if (!emp) {
    return res.status(400).json({error: 'No such emp'})
  }

  res.status(200).json(emp)
}

// update a emp
const updateEmp = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such emp'})
  }

  const emp = await Emp.findOneAndUpdate({_id: id}, {...req.body})

  if (!emp) {
    return res.status(400).json({error: 'No such emp'})
  }
  
  res.status(200).json(emp)
}


module.exports = {
  getEmps,
  getEmp,
  createEmp,
  deleteEmp,
  updateEmp
}
