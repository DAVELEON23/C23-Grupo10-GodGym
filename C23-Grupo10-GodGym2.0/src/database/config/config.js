require("dotenv").config();

module.exports={
  "development": {
    "username": process.env.DB_username,
    "password": process.env.DB_password,
    "database": process.env.DB_database,
    "host": process.env.DB_host,
    "dialect": process.env.DB_dialect,
    "port": process.env.DB_port,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
