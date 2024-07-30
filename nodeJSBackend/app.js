const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const usersAuthRouter = require('./userAuthertication/usersAuthRoutes');
const userProfileRouter = require('./userProfile/userProfileRoutes');
const userRoutes = require('./users/userRoutes');
const flowchartRouter = require('./flowcharts/flowchartRoutes');
const promptFileRouter = require('./promptFiles/promptFileRoutes');
const botsRouter = require('./bots/botRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const authController = require('./users/authController');

const app = express();
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const allowedOrigins = [
  'http://localhost:5173',
  'http://91.107.194.217:5170',
  'http://91.107.194.217:5173/',
  'http://172.31.149.141:5173',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// app.use(bodyParser.json());
// app.use(express.static(`${__dirname}/public`));

// User Login routes
// app.use('/api/v1/users', usersAuthRouter);
app.use('/api/v1/users', userRoutes);

// USER PROFILE ROUTES
// app.use('/api/v1/users/profiles', userProfileRouter);

// FlowChart Routes
app.use('/api/v1/flowcharts', authController.protect, flowchartRouter);

// Bots Routs
app.use('/api/v1/bots', authController.protect, botsRouter);

// PROMPT FILE ROUTES
// app.use('/api/v1/promptfiles', promptFileRouter);

// RESPONE FOR HOME LINK
app.get('/', (req, res) => {
  res.status(200).json({ status: 'connected' });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
