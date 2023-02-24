// require('dotenv').config()
require("dotenv").config({ path: "./config.env" });
const express = require('express')
const mongoose = require('mongoose')
const empRoutes = require('./routes/emp')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/emps', empRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URI ,
  {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  });