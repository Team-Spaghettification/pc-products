const csv = require('csv-parser');
const fs = require('fs');
const db = require('../database/databaseIndex.js');

const reader = fs.createReadStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/features.csv').pipe(csv());
const writer = fs.createWriteStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/cleaned_features.csv');

reader.on('data', (data) => {
  console.log('writting ID: ', data.id);
  if (data.id !== undefined){
    var result = writer.write(`${data.id},${data.product_id},`+ '"' + data.feature + '"' + ',' + '"' + data.value + '"' + '\n')
    if (!result) {
      reader.pause();
    }
    //console.log('everything: ', data.id, data.product_id, data.feature, data.value)
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