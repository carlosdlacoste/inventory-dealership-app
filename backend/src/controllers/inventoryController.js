const inventoryModel = require('../models/inventoryModel');

const getInventory = async (req, res) => {
    try {
        const data = await inventoryModel.getInventoryData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getInventory };