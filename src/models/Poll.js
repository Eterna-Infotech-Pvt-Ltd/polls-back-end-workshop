const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Poll = sequelize.define(
  "Poll",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    question: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.TEXT },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    closesAt: { type: DataTypes.DATE },
  },
  { tableName: "polls" },
);

module.exports = Poll;
