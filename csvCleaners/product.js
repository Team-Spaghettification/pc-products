const csv = require('csv-parser');
const fs = require('fs');
const db = require('../database/databaseIndex.js');

const reader = fs.createReadStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/product.csv').pipe(csv());
const writer = fs.createWriteStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/cleaned_product.csv');

reader.on('data', (data) => {
  if (!data.default_price) {
    //console.log('missing price', data.category)
    data.default_price = data.category;
    data.category = data.description;
    data.description = data.slogan;
    data.slogan = '';
    //console.log(data.slogan, data.description, data.category, data.default_price);
  }
  if (data.default_price[data.default_price.length - 3] !== '.') {
   data.default_price = data.default_price + '.00';

  }
  if (data.default_price[0] === '$') {
    var newData = data.default_price.slice(1);
    data.default_price = newData;
  }
  console.log('about to enter this, clean it: ', data.id);
  if (data.default_price !== undefined) {
    var result = writer.write(data.id + ',' + '"' + data.name + '"' + ',' + '"' + data.slogan + '"' + ',' + '"' + data.description + '"' + ',' + '"' + data.category + '"' + ','
    + data.default_price + "\n");
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
  console.log('write done')
})
