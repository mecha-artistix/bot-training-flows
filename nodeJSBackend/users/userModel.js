const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  // USER PROFILE
  firstName: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  lastName: { type: String },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  username: { type: String, required: [true, 'Please provide a username'] },

  // image: '',

  dateOfBirth: { type: Date },
  gender: { type: String },
  phone: {
    type: String,
    match: /^[0-9+\-\s()]*$/,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  // USER CONTENT
  role: {
    type: String,
    enum: ['user', 'member', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'password did not match',
    },
    select: false,
  },
  passwordChangedAt: { type: Date },
  passwordChangedAt: { type: Date },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: { type: Boolean, default: true, select: false },
  flowcharts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flowchart' }],
  bots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bot' }],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// removing inactive users from find()
userSchema.pre(/^find/, function (next) {
  // this point to currect query
  this.find({ active: { $ne: false } }); // we are doing notEqualto fasle because some users dont have the active  prop
  next();
});

// instance method - method that is awailable on all docs of certain collection
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  // this.password  = undefined as wehave selected false in model schema
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
