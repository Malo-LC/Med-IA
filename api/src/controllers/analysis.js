const Analysis = require("../models/analysis");
const User = require("../models/user");

const router = require("express").Router();

router.get("/history", async (req, res) => {
  try {
    const userId = req?.session?.passport?.user;
    if (!userId) return res.status(400).json({ error: "User not found, please reconnect", ok: false });
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(400).json({ error: "User not found, please reconnect", ok: false });
    const history = await Analysis.findAll({ where: { userId: user.id } });
    return res.status(200).json({ ok: true, message: "History retrieved", data: history });
  } catch (error) {
    console.log(error?.code || error);
  }
});

module.exports = router;
