const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["economy", "standart", "comfort", "luxury"], // Type of package
    },
    seatsLeft:{
     type: Number, 
     required: true, // Number of seats left for the package
    },
    name: {
      type: String,
      required: true, // Name of the package
    },
    photo:{
      type: Object,
      required: true, // Main photo of the package, stored as an object (e.g., Cloudinary URL)
    },
    price: Number, // Price of the package, can be a number or null
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
      required: true,
    },
    hotelName: {
      type: String,
    },
    hotelImages:{
       type: Array,
       default:[],
    },
    hotelDistance: {
      type: Number,
    },
    hotelStars: {
      type: Number,
    },
    hotelDescription: {
      type: String,
      required: true,
    },
    mealPlan: {
      type: String,
      required: true,
    },
    medicalService: {
      type: String,
      required: true,
    },
    transportService: {
      type: String,
      required: true,
    },
    gifts: {
      type: Array,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);
