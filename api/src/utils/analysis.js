const User = require("../models/user");
const Analysis = require("../models/analysis");

const saveAnalysisToDb = async (type, result, image, userId, patientId) => {
  try {
    if (!userId) return { error: "User not found, please reconnect" };
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return { error: "User not found, please reconnect" };
    console.log(result);
    result = result === "Normal" ? false : true;
    console.log(result);

    await Analysis.create({
      type,
      result,
      image,
      userId,
      patientId,
    });
  } catch (error) {
    console.log(error);
    return { error: "Error saving analysis to database" };
  }
};

module.exports = { saveAnalysisToDb };
