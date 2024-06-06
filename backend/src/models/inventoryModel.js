const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const getInventoryData = () => {
    return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(__dirname, '../../data/sample-data-v2.csv');

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            resolve(results);
        })
        .on('error', (err) => {
            reject(err);
        });
});
};

const filterDataByBrand = (data, brand) => {
    return data.filter(item => item.brand === brand);
};

const filterDataByPeriod = (data, period) => {
    const now = new Date();
  
    switch (period) {
        case 'lastMonth':
            const lastMonthStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastMonthEndDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
            return data.filter(item => {
            const itemDate = new Date(item.timestamp);
            return itemDate >= lastMonthStartDate && itemDate <= lastMonthEndDate;
            });
    
        case 'currentMonth':
            const currentMonthStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
            return data.filter(item => {
            const itemDate = new Date(item.timestamp);
            return itemDate >= currentMonthStartDate && itemDate <= now;
            });
    
        case 'last3Months':
            const last3MonthsStartDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
            return data.filter(item => {
            const itemDate = new Date(item.timestamp);
            return itemDate >= last3MonthsStartDate && itemDate <= now;
            });
    
        case 'last6Months':
            const last6MonthsStartDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
            return data.filter(item => {
            const itemDate = new Date(item.timestamp);
            return itemDate >= last6MonthsStartDate && itemDate <= now;
            });
    
        case 'currentYear':
            const currentYearStartDate = new Date(now.getFullYear(), 0, 1);
            return data.filter(item => {
            const itemDate = new Date(item.timestamp);
            return itemDate >= currentYearStartDate && itemDate <= now;
            });
    
        case 'lastYear':
            const lastYearStartDate = new Date(now.getFullYear() - 1, 0, 1);
            const lastYearEndDate = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
            return data.filter(item => {
            const itemDate = new Date(item.timestamp);
            return itemDate >= lastYearStartDate && itemDate <= lastYearEndDate;
        });
  
        default:
            return data;
    }
};


module.exports = { getInventoryData, filterDataByBrand, filterDataByPeriod };