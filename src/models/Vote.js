const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vote = sequelize.define(
  "Vote",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  },
  {
    tableName: "votes",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "poll_id"],
        name: "uq_one_vote_per_poll",
      },
      { fields: ["poll_id", "option_id"] },
    ],
  },
);

module.exports = Vote;
