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
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    job: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img_url: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
});

module.exports = User;