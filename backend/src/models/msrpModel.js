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
        .on('error', (error) => {
            reject(error);
        });
    });
};

module.exports = { getInventoryData };