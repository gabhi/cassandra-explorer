var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var config = require('../config')

var client = new cassandra.Client(config.cassandra);
var create_keyspace_query = "CREATE KEYSPACE ";
router.get('/', function(req, res, next) {
    console.log(req.query.page + "==" + req.query.limit);
    var query = 'select * from schema_keyspaces';
    client.execute(query, function(err, result) {
        res.render('keyspaces', {
            title: "Keyspaces",
            data: result
        });
    });

});

router.post('/', function(req, res, next) {
    client.execute(create_keyspace_query + req.body.keyspace_name + " WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};", function(err, result) {
        res.redirect("/keyspaces");
    });

});

router.get('/:keyspace_name', function(req, res, next) {
    console.log(req.query.page + "==" + req.query.limit);

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
    console.log(req.query.page + "==" + req.query.limit);

    var keyspace_name = req.params.keyspace_name;
    var table_name = req.params.table_name;
    var final_table_name = keyspace_name + "." + table_name;
    var query = "select * from " + final_table_name + " Limit 5";
    client.execute(query, function(err, result) {
        console.log(err);
        console.log(JSON.stringify(result));
        if (result && result.rows && result.rows.length > 0) {
            console.log("last id: " + result.rows.slice(-1)[0].id);

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