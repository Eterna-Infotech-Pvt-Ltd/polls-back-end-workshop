const { sequelize, Poll, Option, Vote, User } = require("../models");
const { fn, col, literal, Op } = require("sequelize");

exports.list = async (req, res) => {
  const polls = await Poll.findAll({
    where: { isActive: true },
    include: [
      { model: Option, as: "options", attributes: ["id", "label"] },
      { model: User, as: "author", attributes: ["id", "name"] },
    ],
    order: [["createdAt", "DESC"]],
  });
  res.json(polls);
};

exports.create = async (req, res) => {
  const { question, description, options } = req.body;
  if (!question || !Array.isArray(options) || options.length < 2)
    return res
      .status(400)
      .json({ error: "Need a question and at least 2 options" });
  const t = await sequelize.transaction();
  try {
    const poll = await Poll.create(
      { question, description, createdBy: req.user.id },
      { transaction: t },
    );
    await Option.bulkCreate(
      options.map((label, idx) => ({
        pollId: poll.id,
        label,
        displayOrder: idx,
      })),
      { transaction: t },
    );
    await t.commit();
    res.status(201).json({ id: poll.id });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.results = async (req, res) => {
  const pollId = req.params.id;

  const rows = await Option.findAll({
    where: { pollId },
    attributes: ["id", "label", [fn("COUNT", col("Votes.id")), "voteCount"]],
    include: [{ model: Vote, attributes: [] }],
    group: ["Option.id"],
    order: [["displayOrder", "ASC"]],
    raw: true,
  });

  const total = rows.reduce((s, r) => s + Number(r.voteCount), 0);
  res.json({ pollId: Number(pollId), totalValues: total, results: rows });
};
