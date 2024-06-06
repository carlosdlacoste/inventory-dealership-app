const fs = require('fs');
const csv = require('csv-parser');

const getInventoryData = () => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream('inventory.csv')
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            resolve(results);
        })
        .on('error', (error) => {
            reject(error);
        });
    });
};

module.exports = { getInventoryData };