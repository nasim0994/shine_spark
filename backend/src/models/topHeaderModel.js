const mongoose = require("mongoose");

const topHeaderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const TopHeader = mongoose.model("TopHeader", topHeaderSchema);

module.exports = TopHeader;
