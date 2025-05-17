// models/FlightCompany.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: String,
    logo: String, // Cloudinary image URL
    country: String,
    description: String,
    website: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);