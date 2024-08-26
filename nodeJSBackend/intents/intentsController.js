const catchAsync = require('../utils/catchAsync');
const Intent = require('./intentsModel');

exports.createIntent = catchAsync(async (req, res, next) => {
  const doc = await Intent.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getAllIntents = catchAsync(async (req, res, next) => {
  const docs = await Intent.find({});

  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      intents: docs,
    },
  });
});
