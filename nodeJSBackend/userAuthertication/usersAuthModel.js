const mongoose = require('mongoose');
const UserProfile = require('../userProfile/UserProfileModel');

// USSERS AUTHENTICATION SCHEMA
const userAuthSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

// // Middleware to create UserProfile after saving UserAuth
// userAuthSchema.post('save', async function (doc, next) {
//   console.log(doc);
//   try {
//     // Create initial UserProfile with only the user field
//     await UserProfile.create({
//       user: doc._id,
//       basicInfo: { userName: doc.username, firstName: doc.firstName, lastName: doc.lastName },
//       contactInfo: { email: doc.email },
//     });
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = mongoose.model('UserAuth', userAuthSchema);
