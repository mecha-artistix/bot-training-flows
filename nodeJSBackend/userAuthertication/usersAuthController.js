const UserAuth = require('./usersAuthModel');
const UserProfile = require('../userProfile/UserProfileModel');
// Middlewares
exports.deleteProfile = async (req, res, next) => {
  try {
    await UserProfile.deleteMany({ user: req.params.id });
    next();
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Could not delete user profile',
    });
  }
};

// controllers

exports.createUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await UserAuth.create({ username, password, email });
    console.log('newUser =', newUser);
    res.status(201).json({
      status: 'created',
      message: 'user registered',
      data: {
        username: newUser.username,
        userID: newUser._id,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: 'user not registered',
    });
  }
};

exports.authUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserAuth.findOne({ username });
    if (!user)
      return res.status(400).json({
        status: 'failed',
        message: 'User not found',
      });
    if (user.password !== password)
      return res.status(400).json({
        status: 'failed',
        message: 'invalid password',
      });
    res.status(200).json({
      status: 'success',
      data: {
        username: user.username,
        userID: user._id,
      },
    });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserAuth.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'user deleted',
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'user could not be deleted',
    });
  }
};
