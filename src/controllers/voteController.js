const { Vote } = require("../models");
exports.cast = async (req, res) => {
  const { id: pollId } = req.params;
  const { optionId } = req.body;
  const userId = req.user.id;
  if (!optionId) return res.status(400).json({ error: "optionId required" });
  try {
    const vote = await Vote.create({ userId, pollId, optionId });
    res.status(201).json({ id: vote.id });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError")
      return res
        .status(409)
        .json({ error: "You have already voted in this poll" });
    res.status(500).json({ error: err.message });
  }
};
