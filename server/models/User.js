const mongoose = require("mongoose");

const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  balance: {
    type: Number,
    default: 1000,
  },
  isSeller: {
    type: Boolean
  }
});

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);