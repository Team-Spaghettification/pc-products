var mysql = require('mysql');

const config = {
  user: 'student',
  password: 'student',
  database: 'sdcproducts'
};

class Database {
  constructor( config ) {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'student',
      password: 'student',
      database: 'sdcproducts'
    });
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err)
          return reject(err);
        resolve(rows);
      });
    });
  }
}

module.exports = new Database;





/* var connection = mysql.createConnection({
  user: 'student',
  password: 'student',
  database: 'sdcproducts'
});

connection.connect(err => {
  if (err) {
    console.log('err on connect: ', err);
  } else {
    console.log('success');
  }
});

var getProducts = function (arr, callback) {

  var low = 0;
  var high = arr[0] || 5;
  //arr has count and page
  //set the high and low values for query id
  if (arr[1] > 1) {
    high = arr[0] * arr[1];
    low = high - arr[0];
  }

  var queryString = `SELECT * FROM product WHERE id > ${low} AND id <= ${high}`;
  connection.query(queryString, function (err, results) {
    if (err) {
      console.log('got an error in products database: ', err);
    }
    callback(results);
  })
}

var getRelated = function (id, callback) {
  var queryString = `SELECT * FROM related WHERE current_product_id=${id}`;
  connection.query(queryString, function (err, results) {
    if (err) {
      console.log('got an error in related database: ', err);
    }
    callback(results);
  })
}

var getProductId = function (id, callback) {
  var queryString = `SELECT * FROM product WHERE id=${id}`;
  connection.query(queryString, function (err, results) {
    if (err) {
      console.log('got and error in productId database: ', err);
    }
    callback(results);
  })
  connection.query()
}

var getStyles = async (id) => {
  var queryString = `SELECT * FROM styles WHERE product_id = ${id}`;
  var data = await connection.query(queryString);
  for (var i = 0; i < data.length; i++) {
    data[i].photos = await getPhotos(data[i].style_id);
  }
  return data;
}

var getPhotos = async (id) => {
  var queryString = `SELECT * FROM photos WHERE style_id = ${id}`
  var data = await connection.query(queryString);
  return data;
}


module.exports = connection;
module.exports.getProducts = getProducts;
module.exports.getRelated = getRelated;
module.exports.getProductId = getProductId;
module.exports.getStyles = getStyles;
module.exports.getPhotos = getPhotos;
//module.exports.getSkus = getSkus;




/*
KEEP THIS ONE OK???
  var queryString = `SELECT styles.product_id, JSON_ARRAYAGG(JSON_OBJECT("style_id", styles.style_id,"name",
    styles.name, "original_price", styles.original_price, "sale_price", styles.sale_price, "default?", styles.default_style))
    AS "results" FROM styles WHERE styles.product_id=${product_id}`

*/








/*

this one is for product_id:
`SELECT products.*,
JSON_ARRAYAGG(JSON_OBJECT("feature",features.feature,"value",features.value) AS "features" FROM product
JOIN features on features.product_id=products.id WHERE products.id=${product_id} GROUP BY products.id`



this one is for styles:
JSON_ARRAYAGG(JSON_OBJECT("feature",features.feature,"value",features.value) AS "features" FROM product,
JSON_ARRAYAGG(JSON_OBJECT("feature",features.feature,"value",features.value) AS "features" FROM product




`SELECT styles.product_id,
JSON_ARRAYAGG(JSON_OBJECT("style_id", styles.style_id,"name", styles.name, "original_price", styles.original_price, "sale_price", styles.sale_price, "default?", styles.default_style,)
AS "results" FROM styles where styles.productId=${product_id}`



*/