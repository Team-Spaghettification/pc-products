const csv = require('csv-parser');
const fs = require('fs');
const db = require('../database/databaseIndex.js');

const reader = fs.createReadStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/related.csv').pipe(csv());
const writer = fs.createWriteStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/cleaned_related.csv');

reader.on('data', (data) => {
  if (data.related_product_id !== undefined) {
    console.log('writing: ', data.id);
    var result = writer.write(`${data.id},${data.current_product_id},${data.related_product_id} \n`);
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