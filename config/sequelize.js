// connect to sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize('edu_sequelize', 'root', 'admin', {
    host: 'localhost',
    dialect: `mysql` /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

module.exports = sequelize;