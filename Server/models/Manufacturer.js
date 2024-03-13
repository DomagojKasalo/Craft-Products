import mongoose from 'mongoose';

const manufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  foundedYear: Number,
  country: String,
  logoUrl: String
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

export default Manufacturer;
