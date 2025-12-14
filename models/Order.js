const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, default: null },

    contactEmail: { type: String, required: true },

    shippingAddress: {
      firstName: String,
      lastName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
      phone: String,
    },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        size: String,
        color: String,
        image: String,
      },
    ],

    subtotal: Number,
    shippingCost: Number,
    total: Number,

    payment: {
      method: String,
      status: String,
      paypalOrderId: String,
      payerId: String,
      paidAt: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
