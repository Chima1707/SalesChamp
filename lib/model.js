const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    postalcode: { type: String, required: true },
    number: { type: Number, required: true },
    numberAddition: { type: String, default: "" },
    status: { type: String, default: null },
    name: { type: String, default: null },
    email: { type: String, default: null },
  },
  { timestamps: true }
);

mongoose.model("Address", addressSchema);
