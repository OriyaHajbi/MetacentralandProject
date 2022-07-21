const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    default: "O&N.Ltd",
  },
  type: {
    type: String,
    required: true,
  },
  rowIndex: {
        type: Number,
        required: true
    },

  colIndex: {
      type: Number,
      required: true
  },
  cost: {
    type: Number,
    default: 50,
  },
  game: {
    type: String,
    default: "",
  },
  isForSale: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Object
  }
});

module.exports = mongoose.model("Land", landSchema);