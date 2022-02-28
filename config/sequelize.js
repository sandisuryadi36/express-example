// connect to sequelize
const Sequelize = require('sequelize');

// get evirontment state
const env = process.env.NODE_ENV || 'development';

let sequelize

// checking environtment
switch (env) {
    case 'development':
        sequelize = new Sequelize({
            database: 'edu_sequelize',
            username: 'root',
            password: 'admin',
            host: 'localhost',
            port: 3306,
            dialect: `mysql` /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        });
        break;
    case `production`:
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        sequelize = new Sequelize({
            database: process.env.PGDATABASE,
            username: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            dialect: 'postgres'
            });
        break;
}

module.exports = sequelize;