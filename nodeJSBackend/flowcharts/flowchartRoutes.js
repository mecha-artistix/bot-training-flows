const express = require('express');
const authController = require('../users/authController');
const flowchartController = require('./flowchartController');

const router = express.Router();

// router.route('/:user').post(flowchartController.createFlowchart).get(flowchartController.getAllFlowcharts);
// .route('/:userId')
router
  .route('/')
  .get(authController.protect, flowchartController.getAllFlowcharts)
  .post(authController.protect, flowchartController.updateUser, flowchartController.createFlowchart);

router
  .route('/:id')
  .get(authController.protect, flowchartController.getFlowchart)
  .patch(authController.protect, flowchartController.updateFlowchart)
  .delete(authController.protect, flowchartController.deleteFlowchart, flowchartController.clearUser);

module.exports = router;
