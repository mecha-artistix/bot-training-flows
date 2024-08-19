const path = require('path');
const multer = require('multer');
const User = require('./userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('../controllers/handlerFactory');
// Users Route Handlers

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`__dirname to: ${__dirname}`);
    const destinationPath = path.join(__dirname, '../public/img/users');
    console.log(`Uploading to: ${destinationPath}`);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    // user-231231231231-23131231231.jpeg > user-userId-timeStamp
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  //  test if uploaded file is image ->return boolean
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image! please upload correct image'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user post password data
  console.log('File uploaded:', req.file);
  console.log(req.body);
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('this route is not for password updates', 400));
  // 2) update userData
  // const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) req.body.photo = req.file.filename;
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true });

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
