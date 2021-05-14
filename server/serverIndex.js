const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/databaseIndex.js');
const helper = require('../database/helpers.js');

let app = express();

app.use(bodyParser.urlencoded({
  extend: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/products', function (req, res) {
  var output = [];
  helper.getProducts([req.query.count, req.query.page])
  .then((response) => {
    console.log(response);
    res.send(response);
  })
});

app.get('/products/:product_id', function (req, res) {
  var output = [];
  helper.getProductId(req.params.product_id)
  .then((response) => {
    res.send(response);
  })
});

app.get('/products/:product_id/styles', function (req, res) {
  helper.getStyles(req.params.product_id)
  .then((response) => {
    res.send(response);
  })
})

app.get('/products/:product_id/related', function (req, res) {
  helper.getRelated(req.params.product_id)
  .then((response) => {
    res.send(response);
  })
});

let port = 4000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

