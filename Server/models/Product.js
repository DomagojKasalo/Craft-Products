import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String, 
  alcoholPercentage: Number, 
  ibu: Number, 
  srm: Number, 
  type: String, 
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer'
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
