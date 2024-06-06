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

const calculateInventory = async (req, res) => {
    try {
            // Obtener datos del inventario
            const inventoryData = await inventoryModel.getInventoryData();

            // Calcular el inventario por condición y marca
            const inventorySummary = calculateInventorySummary(inventoryData);

            // Enviar el resumen del inventario como respuesta
            res.json(inventorySummary);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    const calculateInventorySummary = (inventoryData) => {
        const inventorySummary = {
        new: {},
        used: {},
        cpo: {}
        };

        // Calcular el inventario por condición y marca
        inventoryData.forEach(vehicle => {
            const { condition, brand } = vehicle;
            if (!inventorySummary[condition][brand]) {
                inventorySummary[condition][brand] = 0;
            }
            inventorySummary[condition][brand]++;
        });

    return inventorySummary;
  };

module.exports = { getInventory, getFilteredInventory, calculateInventory };