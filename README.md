# cassandra-explorer
Cassandra explorer using node js

``git clone https://github.com/gabhi/cassandra-explorer.git``

``cd cassandra-explorer/``

``npm install``

if you have supervisor installed then use following command

``supervisor DEBUG=cassandra-explorer:* ./bin/www`` 

otherwise use following command

``DEBUG=cassandra-explorer:* ./bin/www`` 


then visit

[http://localhost:3000/](http://localhost:3000/)



##Current Features
1. Show keyspaces
2. Create Keyspace
3. Delete Keyspace
4. Show table names for given keyspace
5. Show table data from given table
6. Truncate Table
7. Drop Table

## TODO

5. Delete Rows
6. Search by ID (Table)
