const {saveOtp,getOtp,clearOtp}=require('../models/OtpStorage');
const {sendEmail}=require('./emailService')

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
  

  module.exports = {sendOtp,verifyOtp,resetPassword};