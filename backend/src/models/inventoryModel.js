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

const filterInventoryData = (data, brand, startDate, endDate) => {
    return data.filter(item => {
        const itemDate = new Date(Number(item.timestamp));
        const itemDateOnly = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate());
        return item.brand === brand && itemDateOnly >= startDate && itemDateOnly <= endDate;
    });
};

module.exports = { getInventoryData, filterInventoryData };