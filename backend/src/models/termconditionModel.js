const mongoose = require("mongoose");

const TermConditionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const TermCondition = mongoose.model("TermCondition", TermConditionSchema);

module.exports = TermCondition;
