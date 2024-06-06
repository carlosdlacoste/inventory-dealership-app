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

const calculateInventoryByBrandPeriod = async (req, res) => {
        try {
            const { brand, period } = req.query;
        
            // Obtener datos del inventario
            const inventoryData = await inventoryModel.getInventoryData();
        
            // Filtrar los datos del inventario según la marca y el periodo
            const filteredData = filterInventoryData(inventoryData, brand, period);
        
            // Calcular el inventario por condición y marca
            const inventorySummary = calculateInventorySummaryByBrandPeriod(filteredData);
        
            // Enviar el resumen del inventario como respuesta
            res.json(inventorySummary);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
    
    const filterInventoryData = (inventoryData, brand, period) => {
            const filteredData = inventoryData.filter(vehicle => {
            const matchesBrand = brand ? vehicle.brand === brand : true;
            const matchesPeriod = period ? matchesPeriodFilter(vehicle.timestamp, period) : true;
            return matchesBrand && matchesPeriod;
        });
        return filteredData;
    };
    
    const matchesPeriodFilter = (timestamp, period) => {
        const vehicleDate = new Date(timestamp);
        const currentDate = new Date();
    
        switch (period) {
        case 'lastMonth':
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            return vehicleDate >= lastMonth;
        case 'currentMonth':
            const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            return vehicleDate >= firstDayCurrentMonth;
        case 'last3Months':
            const last3Months = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
            return vehicleDate >= last3Months;
        case 'last6Months':
            const last6Months = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);
            return vehicleDate >= last6Months;
        case 'currentYear':
            const firstDayCurrentYear = new Date(currentDate.getFullYear(), 0, 1);
            return vehicleDate >= firstDayCurrentYear;
        case 'lastYear':
            const firstDayLastYear = new Date(currentDate.getFullYear() - 1, 0, 1);
            const lastDayLastYear = new Date(currentDate.getFullYear(), 0, 0);
            return vehicleDate >= firstDayLastYear && vehicleDate <= lastDayLastYear;
        default:
            return true;
        }
    };
    
    const calculateInventorySummaryByBrandPeriod = (inventoryData) => {
        const inventorySummary = {
            new: {},
            used: {},
            cpo: {}
        };
    
        // Calcular el inventario por condición y marca
        inventoryData.forEach(vehicle => {
        const { condition, brand } = vehicle;
    
        // Inicializa el objeto de la marca si no existe
        if (!inventorySummary[condition]) {
            inventorySummary[condition] = {};
        }
        if (!inventorySummary[condition][brand]) {
            inventorySummary[condition][brand] = 0;
        }
        inventorySummary[condition][brand]++;
        });
    
        return inventorySummary;
    };

module.exports = { getInventory, getFilteredInventory, calculateInventory, calculateInventoryByBrandPeriod};