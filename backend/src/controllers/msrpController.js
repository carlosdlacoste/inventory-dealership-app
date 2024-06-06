const msrpModel = require('../models/msrpModel');

// Función para calcular el MSRP con filtros
const calculateMSRP = async (req, res) => {
    try {
        const { brand, period } = req.query;

        const inventoryData = await msrpModel.getInventoryData();

        const filteredData = filterInventoryData(inventoryData, brand, period);

        const msrpSummary = calculateMSRPSummary(filteredData);

        res.json(msrpSummary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Función para calcular el MSRP sin filtros
const calculateMSRPWithoutFilters = async (req, res) => {
    try {
        const inventoryData = await msrpModel.getInventoryData();

        const msrpSummary = calculateMSRPSummary(inventoryData);

        res.json(msrpSummary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Filtrar datos del inventario según marca y periodo
const filterInventoryData = (inventoryData, brand, period) => {
    const filteredData = inventoryData.filter(vehicle => {
        const matchesBrand = brand ? vehicle.brand === brand : true;
        const matchesPeriod = period ? matchesPeriodFilter(vehicle.timestamp, period) : true;
        return matchesBrand && matchesPeriod;
    });
    return filteredData;
};

// Verificar si el periodo coincide con el timestamp
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

// Calcular el resumen de MSRP
const calculateMSRPSummary = (inventoryData) => {
    const msrpSummary = {
        new: { totalMSRP: 0, count: 0, averageMSRP: 0 },
        used: { totalMSRP: 0, count: 0, averageMSRP: 0 },
        cpo: { totalMSRP: 0, count: 0, averageMSRP: 0 }
    };

    const adjustmentFactors = {
        Toyota: 1.2,
        Honda: 1.15,
        Ford: 1.1,
        // Agrega más marcas y factores de ajuste según sea necesario
    };

    inventoryData.forEach(vehicle => {
        const { condition, brand, price } = vehicle;
        if (price) {
            const priceValue = parseFloat(price);
            const adjustmentFactor = adjustmentFactors[brand] || 1.1; // Usar un factor por defecto si la marca no está en la lista
            const estimatedMSRP = priceValue * adjustmentFactor;

            if (!isNaN(estimatedMSRP)) {
                msrpSummary[condition].totalMSRP += estimatedMSRP;
                msrpSummary[condition].count++;
            }
        }
    });

    Object.keys(msrpSummary).forEach(condition => {
        if (msrpSummary[condition].count > 0) {
            msrpSummary[condition].averageMSRP = msrpSummary[condition].totalMSRP / msrpSummary[condition].count;
        }
    });

    return msrpSummary;
};

module.exports = { calculateMSRP, calculateMSRPWithoutFilters };