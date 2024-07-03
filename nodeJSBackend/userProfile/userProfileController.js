const UserProfile = require('./UserProfileModel');
const UserAuth = require('../userAuthertication/usersAuthModel');
exports.createUserProfile = async (req, res) => {
  try {
    console.log(req.body);
    const { username, firstName, lastName, dateOfBirth, gender, email, phone, address, country } = req.body;

    // Find UserAuth document by username
    const userAuth = await UserAuth.findOne({ username });

    if (!userAuth) {
      return res.status(404).json({ status: 'failed', message: 'User not found' });
    }

    // Create UserProfile data object using userAuth._id
    const userProfileData = {
      user: userAuth._id,
      basicInfo: {
        firstName,
        lastName,
        // userName: userAuth.email,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
      },
      contactInfo: {
        // email: userAuth.email,
        phone,
        address,
        country,
      },
    };

    const userProfile = await UserProfile.findOneAndUpdate(
      { user: userAuth._id }, // Query: Find UserProfile by userAuth._id
      { $set: userProfileData }, // Update: Set userProfileData
      { new: true, upsert: true } // Options: Return updated document, create if not found
    );
    res.status(201).json({ status: 'success', data: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failed', message: 'Failed to create UserProfile' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserProfile.find();
    res.status(200).json({
      status: 'sucess',
      results: users.length,
      data: { users },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'fetching users failed',
    });
  }
};
