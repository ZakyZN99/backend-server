const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorySchema = Schema({
  name: {
    type: String,
    minLength: [3, 'Panjang nama kategori minimal 3 karakter'],
    maxLength: [20, 'Panjang nama kategori maksimal 50 karakter'],
    required: [true, 'Nama kategori harus diisi']
  }
})

module.exports = model('Categories', categorySchema);
