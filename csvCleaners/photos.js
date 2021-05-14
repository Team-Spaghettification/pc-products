const csv = require('csv-parser');
const fs = require('fs');
const db = require('../database/databaseIndex.js');

const reader = fs.createReadStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/photos.csv').pipe(csv());
const writer = fs.createWriteStream('/home/robert/HackReactor/SDC/pc-products/csvFiles/cleaned_photos.csv');

reader.on('data', (data) => {
  //console.log(data.url);
  if (!data.thumbnail_url){
    data.thumbnail_url = 'No Photo Available';
  }

  if (data.thumbnail_url !== undefined) {
    //console.log(Number(data.id) + ',' + Number(data.styleId) + ',' + '"' + data.url + '"' + ',' + '"' + data.thumbnail_url + '"' + '\n');
    console.log('numbers: ', data.id);
    var result = writer.write(data.id + ',' + data.styleId + ',' + '"' + data.url + '"' + ',' + '"' + data.thumbnail_url + '"' + '\n');
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