const dotenv = require('dotenv');

dotenv.config();
  const PORT=process.env.PORT || 5500
 const MONGODB_URI= process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/emms'
 const jwtSecret= process.env.JWT_SECRET || 'mysecretkey'
  module.exports = {PORT,MONGODB_URI,jwtSecret}