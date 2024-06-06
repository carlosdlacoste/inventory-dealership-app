const msrpController = require('../models/msrpModel');
const inventoryController = require('../models/inventoryModel');

const buildHistoryLog = async (req, res) => {
    try {
        // Obtener datos de inventario y MSRP
        const inventoryData = await inventoryController.getInventoryData();
        const msrpData = await msrpController.getInventoryData();

        // Crear historial de datos
        const historyLog = inventoryData.map(vehicle => {
            const date = vehicle.timestamp;

            const newInventoryData = inventoryData.filter(v => v.timestamp === date && v.condition === 'new');
            const usedInventoryData = inventoryData.filter(v => v.timestamp === date && v.condition === 'used');
            const cpoInventoryData = inventoryData.filter(v => v.timestamp === date && v.condition === 'cpo');

            const newMsrpData = msrpData.filter(v => v.timestamp === date && v.condition === 'new');
            const usedMsrpData = msrpData.filter(v => v.timestamp === date && v.condition === 'used');
            const cpoMsrpData = msrpData.filter(v => v.timestamp === date && v.condition === 'cpo');

            const newInventory = newInventoryData.length;
            const newTotalMsrp = newMsrpData.reduce((sum, v) => sum + parseFloat(v.price), 0);
            const newAverageMsrp = newInventory ? newTotalMsrp / newInventory : 0;

            const usedInventory = usedInventoryData.length;
            const usedTotalMsrp = usedMsrpData.reduce((sum, v) => sum + parseFloat(v.price), 0);
            const usedAverageMsrp = usedInventory ? usedTotalMsrp / usedInventory : 0;

            const cpoInventory = cpoInventoryData.length;
            const cpoTotalMsrp = cpoMsrpData.reduce((sum, v) => sum + parseFloat(v.price), 0);
            const cpoAverageMsrp = cpoInventory ? cpoTotalMsrp / cpoInventory : 0;

            return {
                timestamp: date,
                newInventory,
                newTotalMsrp,
                newAverageMsrp,
                usedInventory,
                usedTotalMsrp,
                usedAverageMsrp,
                cpoInventory,
                cpoTotalMsrp,
                cpoAverageMsrp
            };
        });

        res.json(historyLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { buildHistoryLog };