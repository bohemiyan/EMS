const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const hrSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// // Hash the password before saving the user model
// hrSchema.pre('save', async function (next) {
//   const hr = this;
//   if (hr.isModified('password')) {
//     hr.password = await bcrypt.hash(hr.password, 8);
//   }
//   next();
// });

// // Static method to find user by email and password
// hrSchema.statics.findByCredentials = async (email, password) => {
//   const hr = await Hr.findOne({ email });
//   if (!hr) {
//     throw new Error('Invalid login credentials');
//   }
//   const isPasswordMatch = await bcrypt.compare(password, hr.password);
//   if (!isPasswordMatch) {
//     throw new Error('Invalid login credentials');
//   }
//   return hr;
// };

const Hr = mongoose.model('Hr', hrSchema);

module.exports = Hr;
