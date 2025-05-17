// models/Partner.js
const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    name: String,
    type: String, // e.g., "Hotel", "Agency", "Transport"
    description: String,
    logo: String, // Image URL from Cloudinary
    website: String,
    contactEmail: String,
    phoneNumber: String,
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", partnerSchema);