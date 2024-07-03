const express = require('express');
const flowchartController = require('./flowchartController');

const router = express.Router();

// router.route('/:user').post(flowchartController.createFlowchart).get(flowchartController.getAllFlowcharts);
router
  .route('/:user')
  .post(flowchartController.createFlowchart)
  .get(flowchartController.getFlowcharts)
  .post(flowchartController.createFlowchart)
  .delete(flowchartController.deleteFlowchart);

module.exports = router;
