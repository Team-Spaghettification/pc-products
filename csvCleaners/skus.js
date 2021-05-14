const csv = require('csv-parser');
const fs = require('fs');
const db = require('../database/databaseIndex.js');

const reader = fs.createReadStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/skus.csv').pipe(csv());
const writer = fs.createWriteStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/cleaned_skus.csv');

reader.on('data', (data) => {
  //if quantity is missing then we know that size was not included. add a size string
  if (!data.quantity) {
    data.quantity = data.size;
    data.size = 'Out of stock';
  }

  //write the corrected data
  if (data.quantity !== undefined) {
    var result = writer.write(data.id + ',' + data.styleId + ',' + '"' + data.size + '"' + ',' + data.quantity +  '\n');
    if (!result) {
      reader.pause();
    }
  }
})

writer.on('drain', () => {
  reader.resume();
})
reader.on('end', () => {
  writer.end();
})
writer.on('close', () => {
  console.log('write done');
})