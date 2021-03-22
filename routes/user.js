const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});
module.exports = Mongoose.model('User', userSchema);
