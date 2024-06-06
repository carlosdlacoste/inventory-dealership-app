const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', inventoryController.getInventory);
router.get('/filter', inventoryController.getFilteredInventory);
router.get('/calculate', inventoryController.calculateInventory);
router.get('/calculate/filter', inventoryController.calculateInventoryByBrandPeriod);

module.exports = router;