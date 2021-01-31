let mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
    },
    size: {
        type: "string",
        required: true,
    },
    quantity: {
        type: "string",
        required: true,
    },
    image: {
        type: "string",
        required: true,
    },

    category: {
        type: "string",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    count: { type: Number, default: 1 },
    description: {
        type: "string",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("product", productSchema);
