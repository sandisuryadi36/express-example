// connect to sequelize
const Sequelize = require('sequelize');

// get evirontment state
const env = process.env.NODE_ENV || 'development';

let sequelize

// checking environtment
switch (env) {
    case 'development':
        sequelize = new Sequelize('edu_sequelize', 'root', 'admin', {
            host: 'localhost',
            port: 3306,
            dialect: `mysql` /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        });
        break;
    case `production`:
        sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: 'postgres'
            });
        break;
}

module.exports = sequelize;