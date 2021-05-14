const db = require('./databaseIndex.js');

var getProducts = async (arr) =>{
  var low = 0;
  var high = arr[0] || 5;
  //this gives back parameters for the id in query
  if (arr[1] > 1) {
    high = arr[0] * arr[1];
    low = high - arr[0];
  }

  var queryString = `SELECT *
  FROM product
  WHERE id > ${low}
  AND id <= ${high}`;

  var data = await db.query(queryString)
  return data;
}

var getRelated = async (id) => {

  var queryString = `SELECT related_product_id
  FROM related
  WHERE current_product_id=${id}`;

  var data = await db.query(queryString);
  console.log(data);
  var arr = [];
  for (var i = 0; i < data.length; i++){
    arr.push(data[i]['related_product_id'])
  }
  return arr;
}

var getProductId = async (id) => {

  var queryString = `SELECT *
  FROM product
  WHERE id=${id}`;

  var data = await db.query(queryString);
  for (var i = 0; i < data.length; i++) {
    console.log(data[i])
    data[i]['features'] = await getFeatures(data[i].id);
  }
  return data;
}

var getStyles = async (id) => {
  var resultObj = {};

  var queryString = `SELECT *
  FROM styles
  WHERE product_id = ${id}`;

  var data = await db.query(queryString);

  for (var i = 0; i < data.length; i++) {
    var digit = data[i].default;
    delete data[i].default;
    data[i]['default?'] = digit === 1 ? true : false;
    data[i].photos = await getPhotos(data[i].style_id);
    data[i].skus = await getSkus(data[i].style_id);
    resultObj['product_id'] = data[i].product_id;
    delete data[i].product_id;
    resultObj['results'] = data;
  }

  return resultObj;
}

var getPhotos = async (id) => {

  var queryString = `SELECT photos.thumbnail_url, photos.url
  FROM photos
  WHERE photos.style_id = ${id}`;

  var data = await db.query(queryString);
  return data;
}

var getFeatures = async (id) => {

  var queryString = `SELECT features.feature, features.value
  FROM features
  WHERE features.product_id = ${id}`;

  var data = await db.query(queryString);
  return data;

}

var getSkus = async (id) => {
  var dataObj = {};

  var queryString = `SELECT skus.id, skus.size, skus.quantity
  FROM skus
  WHERE skus.style_id = ${id}`;

  var data  = await db.query(queryString);
  for (var i = 0; i < data.length; i++) {
    dataObj[data[i].id] = {
      'quantity': data[i].quantity,
      'size': data[i].size
    };
  }
  return dataObj;
}




module.exports.getProducts = getProducts;
module.exports.getRelated = getRelated;
module.exports.getProductId = getProductId;
module.exports.getStyles = getStyles;
module.exports.getPhotos = getPhotos;


