const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create a TTL index on 'createdAt' field
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 20 }); // 300 seconds = 5 minutes


const OtpModel = mongoose.model('Otp', otpSchema);

const saveOtp = async (email, otp) => {
  try {
    await OtpModel.create({ email, otp });
  } catch (error) {
    throw new Error('Failed to save OTP');
  }
};

const getOtp = async (email) => {
  try {
    const otpDoc = await OtpModel.findOne({ email });
    if (otpDoc) {
      return otpDoc.otp;
    }
    return null; // OTP not found for the given email
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
