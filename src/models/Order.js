const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    package: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);