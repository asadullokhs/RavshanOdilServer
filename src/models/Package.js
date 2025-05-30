const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: {
      uz: String,
      ru: String,
      en: String,
    },
    price: Number,
    duration: {
      uz: String,
      ru: String,
      en: String,
    },
    departureDate: Date,
    returnDate: Date,
    visaType: {
      uz: String,
      ru: String,
      en: String,
    },
    departureCity: {
      uz: String,
      ru: String,
      en: String,
    },
    stopoverCities: [
      {
        uz: String,
        ru: String,
        en: String,
      },
    ],
    arrivalCity: {
      uz: String,
      ru: String,
      en: String,
    },
    hotel: {
      name: String,
      distance: Number,
      stars: Number,
      description: {
        uz: String,
        ru: String,
        en: String,
      },
      images: Array,
    },
    mealPlan: {
      uz: String,
      ru: String,
      en: String,
    },
    medicalService: {
      uz: String,
      ru: String,
      en: String,
    },
    transportService: {
      uz: String,
      ru: String,
      en: String,
    },
    gifts: [
      {
        uz: String,
        ru: String,
        en: String,
      },
    ],
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    airline: String,
    details: {
      uz: String,
      ru: String,
      en: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);