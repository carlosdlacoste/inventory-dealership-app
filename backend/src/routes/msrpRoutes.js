const express = require('express');
const router = express.Router();
const msrpController = require('../controllers/msrpController');

router.get('/calculate/filter', msrpController.calculateMSRP);
router.get('/calculate', msrpController.calculateMSRPWithoutFilters);

module.exports = router;