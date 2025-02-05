const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    qus: {
      type: String,
      required: true,
      unique:true
    },
    ans: {
        type: String,
        required: true,
      }
  },
  { timestamps: false }
);

const Faq = mongoose.model("faq", faqSchema);

module.exports = Faq;
