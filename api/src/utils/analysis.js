const User = require("../models/user");
const Analysis = require("../models/analysis");

const saveAnalysisToDb = async (type, result, image, userId) => {
  try {
    if (!userId) return { error: "User not found, please reconnect" };
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return { error: "User not found, please reconnect" };

    result = result === "normal" ? false : true;

    await Analysis.create({
      type,
      result,
      image,
      userId,
    });
  } catch (error) {
    console.log(error);
    return { error: "Error saving analysis to database" };
  }
};

module.exports = { saveAnalysisToDb };
