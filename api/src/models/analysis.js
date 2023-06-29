const { DataTypes } = require("sequelize");
const { db } = require("../mysqlDb");
const User = require("./user");

const Analysis = db.define(
  "Analysis",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      enum: ["pneumonia", "melanoma"],
    },
    result: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      description: "True if positive, false if negative",
    },
    image: {
      type: DataTypes.TEXT("medium"),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
);

Analysis.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Analysis, { foreignKey: "userId" });

module.exports = Analysis;
