const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Hr = require('../models/Hr');
const { jwtSecret } = require('../config');
const {saveOtp,getOtp,clearOtp}=require('../models/OtpStorage');
const {sendEmail}=require('./emailService')

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

sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    // Implement your logic to generate and send OTP to the provided email
    const generateOtp = () => {
      const otpLength = 6;
      let otp = '';
      for (let i = 0; i < otpLength; i++) {
        otp += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
      }
      return otp;
    };
    // You can use external libraries or services for email sending, or implement your own logic
    // Example using a fictional email service:
    const otp = generateOtp(); // Implement your logic to generate an OTP
    console.log(otp);
    // await sendEmail(email, 'OTP Verification',otp);
    // You can also store the generated OTP in your database or cache for verification purposes
    // Example using a fictional OTP storage:
    await saveOtp(email, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Implement your logic to verify the OTP
    // Retrieve the stored OTP from your database or cache
    // Example using a fictional OTP storage:
    const storedOtp = await getOtp(email);
    if (!storedOtp) {
      return res.status(400).json({ error: 'OTP verification failed' });
    }
    if (otp === storedOtp) {
      // OTP verification successful
      // You can clear the stored OTP from your database or cache here
      // Example using a fictional OTP storage:
      await clearOtp(email);
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ error: 'OTP verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    // Implement your logic to reset the HR's password
    // Retrieve the HR from your database using the provided email
    const hr = await Hr.findOne({ email });
    if (!hr) {
      return res.status(404).json({ error: 'HR not found' });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the HR's password in the database
    hr.password = hashedPassword;
    await hr.save();
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
};


module.exports = {register,update,login,sendOtp,verifyOtp,resetPassword};
