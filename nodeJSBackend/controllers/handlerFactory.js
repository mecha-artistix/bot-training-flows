const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../users/userModel');

// we pass in modal and then the function that returns an async fun

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete({ _id: req.params.id });
    // const doc = await Model.findById({ _id: req.params.id });
    if (!doc) return next(new AppError('No doc found with that ID.', 404));

    req.deletedDoc = doc;
    req.model = Model;
    next();
    // res.status(204).json({
    //   status: 'deleted',
    //   data: null,
    // });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!doc) return next(new AppError('No document found with that Id', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
    // next();
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    // const doc = await Model.findById(req.params.id).populate('reviews');

    if (!doc) return next(new AppError('No document found with that id', 404));
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const modelArrName = Model.modelName.toLowerCase() + 's';
    console.log(modelArrName);
    let filter = { _id: { $in: req.user[modelArrName] } };
    console.log(filter);
    // if(req.user.bots)
    // if (req.params.tourId) filter = { tour: req.params.tourId };
    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();

    const doc = await features.query;
    // send response
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
