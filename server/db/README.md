# Database Configuration

- Database: MySQL v5.7.21

## To create database and all tables
```
 ./build_db.sh [database name] [new users name] [new users password]
```

Or use [setup.sql](setup.sql) directly:

``` mysql -u [username] -p < setup.sql```

## To insert all test data
```
 ./add_test_data.sh [database name] [username] [password]
```

Or use [test-data.sql](test-data.sql) directly:

```mysql -u [username] -p < test-data.sql```
