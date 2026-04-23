const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Option = sequelize.define('Option', {
id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
label: { type: DataTypes.STRING(120), allowNull: false },
displayOrder: { type: DataTypes.SMALLINT, defaultValue: 0 }
}, { tableName: 'options' })

module.exports = Option;