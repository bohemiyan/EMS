const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Hr = require('../models/hr');
const { jwtSecret } = require('../utils/config');

// Controller function to handle HR registration
register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if HR with the same email already exists
    const existingHr = await Hr.findOne({ email });
    if (existingHr) {
      return res.status(409).json({ error: 'HR with this email already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new HR
    const hr = new Hr({
      name,
      email,
      password: hashedPassword
    });
    // Save the HR to the database
    await hr.save();
    const token = jwt.sign({ id: hr._id }, jwtSecret,{ expiresIn: '3d' });
    res.status(201).json({ message: 'HR created successfully',token, name:hr.name, email:hr.email  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//controller function to handle hr update
update=async(req,res)=>{
  try{
    const hrid = req.Hrid.id;
    const{name,password,newpassword}=req.body;
// console.log(password)
    //check if Hr with that id is exists
    const hrs=await Hr.findById(hrid);
    if(!hrs){
    return res.status(401).json({error:'invalid email or password'})
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, hrs.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    let updatedhr={}
    if(newpassword){
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        // Create a new HR
        updatedhr ={password: hashedPassword};
     }
     if(name){updatedhr={name:name};}

    const hr = await Hr.findByIdAndUpdate(hrid, updatedhr, { new: true });
    res.status(201).json({ message: 'HR Updated successfully', name:hr.name });
    }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } 
  };

// Controller function to handle HR login
login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if HR with this email exists
    const hr = await Hr.findOne({ email });
    if (!hr) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, hr.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: hr._id }, jwtSecret,{ expiresIn: '3d' });

    res.status(200).json({ message: 'HR logged in successfully', token, name: hr.name,email:hr.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
};
module.exports = {register,update,login};
