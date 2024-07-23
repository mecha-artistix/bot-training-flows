const User = require('./userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');
// Users Route Handlers

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user post password data
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('this route is not for password updates', 400));
  // 2) update userData
  const filteredBody = filterObj(req.body, 'name', 'email');
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);
// do not attempt to update password with this
// exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
