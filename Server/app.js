import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as productController from './controllers/productController.js';
import * as manufacturerController from './controllers/manufacturerController.js';
import * as authController from './controllers/authController.js';
import verifyToken from './jwt.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb://127.0.0.1:27017/Seminar', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Dobrodošli na početnu stranicu');
});

// Rute za Proizvođače
app.get('/manufacturers', verifyToken, manufacturerController.getManufacturers);
app.post('/manufacturers', verifyToken, manufacturerController.createManufacturer);
app.put('/manufacturers/:id', verifyToken, manufacturerController.updateManufacturer);
app.get('/manufacturers/:id', verifyToken, manufacturerController.getManufacturerById);
app.delete('/manufacturers/:id', verifyToken, manufacturerController.deleteManufacturer);

// Rute za Proizvode
app.get('/products', verifyToken, productController.getProducts);
app.post('/products', verifyToken, productController.createProduct);
app.put('/products/:id', verifyToken, productController.updateProduct);
app.get('/products/:id', verifyToken, productController.getProductById);
app.delete('/products/:id', verifyToken, productController.deleteProduct);

// Rute za Korisnika
app.get('/users', verifyToken, authController.getUsers);
app.get('/users/:id', verifyToken, authController.getUserById);
app.put('/users/:id', verifyToken, authController.updateUser);
app.post('/users/check-password/:id', verifyToken, authController.checkPassword);
app.put('/users/:id/change-password', verifyToken, authController.changePassword);

app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', authController.logout);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
