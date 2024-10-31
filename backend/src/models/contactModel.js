const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    address: {
      type: String,
    },
    socials: {
      type: Array,
    },
  },
  { timestamps: false }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
