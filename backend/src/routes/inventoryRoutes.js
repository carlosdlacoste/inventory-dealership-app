const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', inventoryController.getInventory);
router.get('/filter', inventoryController.getFilteredInventory);

module.exports = router;