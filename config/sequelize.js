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
        sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
            host: DB_HOST,
            port: DB_PORT,
            dialect: 'postgres'
        });
        break;
}

module.exports = sequelize;