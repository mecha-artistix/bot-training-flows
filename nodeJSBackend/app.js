const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const usersAuthRouter = require('./userAuthertication/usersAuthRoutes');
const userProfileRouter = require('./userProfile/userProfileRoutes');
const flowchartRouter = require('./flowcharts/flowchartRoutes');
const promptFileRouter = require('./promptFiles/promptFileRoutes');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());

// app.use(bodyParser.json());
// app.use(express.static(`${__dirname}/public`));

app.use(morgan('dev'));

// User Login routes
app.use('/api/v1/users', usersAuthRouter);

// USER PROFILE ROUTES
app.use('/api/v1/users/profiles', userProfileRouter);

// FlowChart Routes
app.use('/api/v1/flowcharts', flowchartRouter);

// PROMPT FILE ROUTES
app.use('/api/v1/promptfiles', promptFileRouter);

// RESPONE FOR HOME LINK
app.get('/', (req, res) => {
  res.status(200).json({ status: 'connected' });
});

module.exports = app;
