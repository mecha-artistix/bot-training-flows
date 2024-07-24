const express = require('express');
const authController = require('../users/authController');
const flowchartController = require('./flowchartController');

const router = express.Router();

// router.route('/:user').post(flowchartController.createFlowchart).get(flowchartController.getAllFlowcharts);
// .route('/:userId')
router
  .route('/')
  .get(flowchartController.getAllFlowcharts)
  .post(flowchartController.updateUser, flowchartController.createFlowchart);

router
  .route('/:id')
  .get(flowchartController.getFlowchart)
  .patch(flowchartController.updateFlowchart)
  .delete(flowchartController.deleteFlowchart, flowchartController.clearUser);

module.exports = router;
