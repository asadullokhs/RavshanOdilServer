const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["economy", "standart", "comfort", "luxury"], 
    },
    seatsLeft: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: Object,
      required: true, // Example: { url: "...", public_id: "..." }
    },
    price: {
      type: Number,
      required: true,
    },
    departureDate: Date,
    returnDate: Date,
    visaType: String,
    departureCity: String,
    stopoverCities: [String],
    arrivalCity: String,
    mealPlan: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    details: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);