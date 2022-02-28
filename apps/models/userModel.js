const sequelize = require('../../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    job: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = User;