var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var config = require('../config')

var client = new cassandra.Client(config.cassandra);

router.get('/', function(req, res, next) {
    var query = 'select * from schema_keyspaces';
    client.execute(query, function(err, result) {
        res.render('keyspaces', {
            title: "Keyspaces",
            data: result
        });
    });

});

router.get('/:keyspace_name', function(req, res, next) {
    var keyspace_name = req.params.keyspace_name;
    var query = "select columnfamily_name from system.schema_columnfamilies where keyspace_name = '" + keyspace_name + "'";
    client.execute(query, function(err, result) {
        res.render('list_tables', {
            title: "Table listings for keyspace ",
            keyspace_name: keyspace_name,
            data: result
        });
    });

});

router.get('/:keyspace_name/:table_name', function(req, res, next) {
    var keyspace_name = req.params.keyspace_name;
    var table_name = req.params.table_name;
    var final_table_name = keyspace_name + "." + table_name;
    var query = "select * from " + final_table_name;
    client.execute(query, function(err, result) {
        console.log(err);
        // console.log(JSON.stringify(result.row[0]));
        if (result && result.rows && result.rows.length > 0) {
            var fields = Object.keys(result.rows[0]);
            res.render('table_data', {
                title: "Table  " + final_table_name,
                keyspace_name: keyspace_name,
                data: result,
                fields: fields
            });
        } else {
            res.render('table_data', {
                title: "Table  " + final_table_name,
                keyspace_name: keyspace_name,
                data: "No Data found",

            });
        }

    });

});


//select columnfamily_name from system.schema_columnfamilies where keyspace_name = 'test';
module.exports = router;