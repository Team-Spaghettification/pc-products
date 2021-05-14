const csv = require('csv-parser');
const fs = require('fs');
const db = require('../database/databaseIndex.js');

const reader = fs.createReadStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/styles.csv').pipe(csv());
const writer = fs.createWriteStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/cleaned_styles.csv');

reader.on('data', (data) => {
  //if default style is missing then we know there is another column that is sometimes not included
  if (!data.default_style) {
    //if default data isn't what it is supposed to be, move the columns to the correct place
    data.default_style = data.original_price;
    data.original_price = data.sale_price;
    data.sale_price = data.name;
    data.name = 'Name not included';
    // console.log('this one is messed up: ', data.id, data.productId, data.name, data.sale_price, data.original_price, data.default_style)
  }
  //if the sale price has a number for a value, format the number correctly
  if (data.sale_price !== 'null') {
    //if it doesnt have a decimal amount...add it
    if (data.sale_price[data.sale_price.length - 3] !== '.') {
      data.sale_price = data.sale_price + '.00';
    }
    //if it has a dollar sign...remove it
    if (data.sale_price[0] === '$') {
      var newData = data.sale_price.slice(1);
      data.sale_price = newData;
    }
  }

  //format original price correctly
  if (data.original_price) {
    //add decimal places if needed
    if (data.original_price[data.original_price.length - 3] !== '.') {
      data.original_price = data.original_price + '.00';
    }
    //remove $ if needed
    if (data.original_price[0] === '$') {
      var newData = data.original_price.slice(1);
      data.original_price = newData;
    }
  }

  if (data.sale_price === 'null') {
    data.sale_price = 0;
  }


  //console.log('addin', data.id, data.productId, data.name, data.sale_price, data.original_price, data.default_style);
  if (data.default_style !== undefined) {
    //console.log(data.sale_price);
    var result = writer.write(data.id + ',' + data.productId + ',' + '"' + data.name + '"' + ',' + data.sale_price + ',' + data.original_price +
    ',' + data.default_style + '\n')
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