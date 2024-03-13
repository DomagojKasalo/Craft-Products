import Product from '../models/Product.js';

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('manufacturer', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('manufacturer');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }

  const { name, description, price, category, alcoholPercentage, ibu, srm, type, manufacturer } = req.body;

  const product = new Product({
    name,
    description,
    price,
    category,
    alcoholPercentage,
    ibu,
    srm,
    type,
    manufacturer
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.category = req.body.category ?? product.category;
    product.alcoholPercentage = req.body.alcoholPercentage ?? product.alcoholPercentage;
    product.ibu = req.body.ibu ?? product.ibu;
    product.srm = req.body.srm ?? product.srm;
    product.type = req.body.type ?? product.type;
    product.manufacturer = req.body.manufacturer ?? product.manufacturer;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
