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
2. Show table names for give keyspace
3. Show table data from give table

## TODO
1. Create Keyspace
2. Delete Keyspace
3. Truncate Table
4. Drop Table
5. Delete Rows
6. Search by ID (Table)
