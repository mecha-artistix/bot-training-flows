const express = require('express');
const cors = require('cors');
const path = require('path');
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
const intentRoutes = require('./intents/intentsRoutes');

const app = express();
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const ALLOWED_ORIGINS = ['127.0.0.1', 'localhost', '91.107.194.217', '172.31.149.141', '209.209.42.134'];

const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      ALLOWED_ORIGINS.some((allowedOrigin) => {
        const { hostname } = new URL(origin);
        return allowedOrigin === hostname;
      })
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// serving static files
app.use('/api/v1/public', express.static(path.join(__dirname, 'public')));

// User Login routes

app.use('/api/v1/users', userRoutes);

// FlowChart Routes
app.use('/api/v1/flowcharts', authController.protect, flowchartRouter);

// Bots Routs
app.use('/api/v1/bots', authController.protect, botsRouter);

// Intent Routes
app.use('/api/bot', intentRoutes);

// RESPONE FOR HOME LINK
app.get('/', (req, res) => {
  res.status(200).json({ status: 'connected' });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
