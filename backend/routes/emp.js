const express = require('express')
const {
  createEmp,
  getEmp,
  getEmps,
  deleteEmp,
  updateEmp
} = require('../controllers/empController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all emp routes
router.use(requireAuth)

// GET all emp
router.get('/', getEmps)

//GET a single emp
router.get('/:id', getEmp)

// POST a new emp
router.post('/', createEmp)

// DELETE a emp
router.delete('/:id', deleteEmp)

// UPDATE a emp
router.patch('/:id', updateEmp)


module.exports = router