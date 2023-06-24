const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  numofcreation: { type: Number, required: true, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

// Create a TTL index on 'createdAt' field
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 }); // 300 seconds = 5 minutes

const OtpModel = mongoose.model('Otp', otpSchema);

const saveOtp = async (email, otp) => {
  let numofcreation=1;
  const otpDoc = await OtpModel.findOne({ email });
if(otpDoc)
{
  numofcreation=otpDoc.numofcreation+1;
}
  // console.log(numofcreation)
  if(numofcreation>3)
  {
    throw new Error(442);
   
  }
  try {
    await OtpModel.deleteOne({ email });
  } catch (error) {
    throw new Error('Failed to clear OTP');
  }
  try {
    await OtpModel.create({ email, otp ,numofcreation});
  } catch (error) {
    throw new Error('Failed to save OTP');
  }

};

const getOtp = async (email) => {
  try {
    const otpDoc = await OtpModel.findOne({ email });
    return otpDoc ? otpDoc.otp : null; // Return null if OTP not found
  } catch (error) {
    throw new Error('Failed to retrieve OTP');
  }
};

const clearOtp = async (email) => {
  try {
    await OtpModel.deleteOne({ email });
  } catch (error) {
    throw new Error('Failed to clear OTP');
  }
};

module.exports = { saveOtp, getOtp, clearOtp };
