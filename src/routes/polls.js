const router = require("express").Router();
const auth = require("../middleware/auth");
const p = require("../controllers/pollController");
const v = require("../controllers/voteController");
router.get("/", auth, p.list);
router.post("/", auth, p.create);
router.get("/:id/results", auth, p.results);
router.post("/:id/vote", auth, v.cast);
module.exports = router;
