var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var config = require('../config')

var client = new cassandra.Client(config.cassandra);


// var query = 'SELECT * FROM supplier_info';
// client.execute(query, function(err, result) {
//   console.log(JSON.stringify(result));
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cassandra Explorer' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

module.exports = router;
