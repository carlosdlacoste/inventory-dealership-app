// const msrpController = require('../controllers/msrpController');
// const inventoryController = require('../controllers/inventoryController');

// const buildHistoryLog = async (req, res) => {
//     try {
//         // Obtener datos de inventario y MSRP
//         const inventoryData = await inventoryController.getInventory();
//         const msrpData = await msrpController.calculateMSRPWithoutFilters();

//         // Calcular inventario total por condición de vehículo
//         const inventorySummary = calculateInventorySummary(inventoryData);

//         // Construir el historial
//         const historyLog = {
//             newInventory: {
//                 count: inventorySummary.new,
//                 totalMSRP: msrpData.new.totalMSRP,
//                 averageMSRP: msrpData.new.averageMSRP
//             },
//             usedInventory: {
//                 count: inventorySummary.used,
//                 totalMSRP: msrpData.used.totalMSRP,
//                 averageMSRP: msrpData.used.averageMSRP
//             },
//             cpo: {
//                 count: inventorySummary.cpo,
//                 totalMSRP: msrpData.cpo.totalMSRP,
//                 averageMSRP: msrpData.cpo.averageMSRP
//             }
//         };

//         // Enviar el historial como respuesta
//         res.json(historyLog);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Función para calcular el inventario total por condición de vehículo
// const calculateInventorySummary = (inventoryData) => {
//     const inventorySummary = {
//         new: 0,
//         used: 0,
//         cpo: 0
//     };

//     // Calcular el inventario total por condición de vehículo
//     inventoryData.forEach(vehicle => {
//         const { condition } = vehicle;
//         inventorySummary[condition]++;
//     });

//     return inventorySummary;
// };

// module.exports = { buildHistoryLog };