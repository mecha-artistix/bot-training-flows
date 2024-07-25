const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserAuth = require('../userAuthertication/usersAuthModel');
dotenv.config({ path: './.env' });
const mongoUrl = process.env.DB_MONGO_URL;

mongoose
  .connect('mongodb://mongo:27017/simple-auth-db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

const usersAuth = JSON.parse(fs.readFileSync(`${__dirname}/users-auth.json`, 'utf-8'));

const importUsers = async () => {
  try {
    await UserAuth.create(usersAuth);
    console.log('Users auth data loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteUsers = async () => {
  try {
    await UserAuth.deleteMany();
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') importUsers();
else if (process.argv[2] === '--delete') deleteUsers();
