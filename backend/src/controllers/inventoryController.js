const inventoryModel = require('../models/inventoryModel');

const getInventory = async (req, res) => {
    try {
        const data = await inventoryModel.getInventoryData();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getFilteredInventory = async (req, res) => {
    try {
        const { brand, period } = req.query;
        let filteredData = await inventoryModel.getInventoryData();
    
        if (brand) {
            filteredData = inventoryModel.filterDataByBrand(filteredData, brand);
        }
    
        if (period) {
            filteredData = inventoryModel.filterDataByPeriod(filteredData, period);
        }
    
        res.json(filteredData);
        } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getInventory, getFilteredInventory };