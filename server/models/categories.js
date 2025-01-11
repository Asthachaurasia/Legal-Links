const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  
}, { timestamps: true });

const category = mongoose.model('category', categorySchema);

module.exports = category;