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
        const data = await inventoryModel.getInventoryData();
        const now = new Date();
        let startDate, endDate;

        switch (period) {
            case 'lastMonth':
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), 0);
            break;
            case 'currentMonth':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = now;
            break;
            case 'last3Months':
            startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
            endDate = now;
            break;
            case 'last6Months':
            startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
            endDate = now;
            break;
            case 'currentYear':
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = now;
            break;
            case 'lastYear':
            startDate = new Date(now.getFullYear() - 1, 0, 1);
            endDate = new Date(now.getFullYear() - 1, 11, 31);
            break;
            default:
            startDate = new Date(0);
            endDate = now;
        }

        const filteredData = inventoryModel.filterInventoryData(data, brand, startDate, endDate);
        res.json(filteredData);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
};

module.exports = { getInventory, getFilteredInventory };