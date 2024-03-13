import Manufacturer from '../models/Manufacturer.js';
import Product from '../models/Product.js';

const getManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.json(manufacturers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) return res.status(404).json({ message: 'Manufacturer not found' });
    res.json(manufacturer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createManufacturer = async (req, res) => {
  const manufacturer = new Manufacturer({
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    foundedYear: req.body.foundedYear,
    country: req.body.country,
    logoUrl: req.body.logoUrl
  });

  try {
    const newManufacturer = await manufacturer.save();
    res.status(201).json(newManufacturer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateManufacturer = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) return res.status(404).json({ message: 'Manufacturer not found' });

    manufacturer.name = req.body.name ?? manufacturer.name;
    manufacturer.location = req.body.location ?? manufacturer.location;
    manufacturer.description = req.body.description ?? manufacturer.description;
    manufacturer.foundedYear = req.body.foundedYear ?? manufacturer.foundedYear;
    manufacturer.country = req.body.country ?? manufacturer.country;
    manufacturer.logoUrl = req.body.logoUrl ?? manufacturer.logoUrl;

    await manufacturer.save();
    res.json(manufacturer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteManufacturer = async (req, res) => {
  try {
    const manufacturerId = req.params.id;

    const relatedProducts = await Product.find({ manufacturer: manufacturerId });
    if (relatedProducts.length > 0) {
      return res.status(400).json({ message: 'Cannot delete manufacturer with linked products' });
    }

    const manufacturer = await Manufacturer.findByIdAndDelete(manufacturerId);
    if (!manufacturer) return res.status(404).json({ message: 'Manufacturer not found' });

    res.json({ message: 'Manufacturer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getManufacturers, getManufacturerById, createManufacturer, updateManufacturer, deleteManufacturer };
