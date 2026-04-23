const sequelize = require("../config/database");
const User = require("./User");
const Poll = require("./Poll");
const Option = require("./Option");
const Vote = require("./Vote");

User.hasMany(Poll, { foreignKey: "createdBy", as: "polls" });
Poll.belongsTo(User, { foreignKey: "createdBy", as: "author" });

Poll.hasMany(Option, {
  foreignKey: "pollId",
  as: "options",
  onDelete: "CASCADE",
});
Option.belongsTo(Poll, { foreignKey: "pollId" });

User.hasMany(Vote, { foreignKey: "userId" });
Poll.hasMany(Vote, { foreignKey: "pollId", onDelete: "CASCADE" });
Option.hasMany(Vote, { foreignKey: "optionId", onDelete: "CASCADE" });
Vote.belongsTo(User, { foreignKey: "userId" });
Vote.belongsTo(Poll, { foreignKey: "pollId" });
Vote.belongsTo(Option, { foreignKey: "optionId" });

module.exports = { sequelize, User, Poll, Option, Vote };
