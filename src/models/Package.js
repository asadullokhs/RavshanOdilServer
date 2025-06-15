const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: Number,
    duration: {
      type: String,
      required: true,
    },
    departureDate: Date,
    returnDate: Date,
    visaType: {
      type: String,
      required: true,
    },
    departureCity: {
      type: String,
      required: true,
    },
    stopoverCities: {
      type: Array,
      required: true,
    },
    arrivalCity: {
       type: String,
      required: true
    },
    hotel: {
      name: String,
      distance: Number,
      stars: Number,
      description: {
        type: String,
      required: true
      },
      images: Array,
    },
    mealPlan: {
      type: String,
      required: true
    },
    medicalService: {
     type: String,
      required: true
    },
    transportService: {
      type: String,
      required: true
    },
    gifts: {
       type: Array,
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    airline: String,
    details: {
     type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);
