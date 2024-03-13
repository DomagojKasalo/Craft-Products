import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).send('Email already exists');

  const salt = await bcrypt.genSalt(10);

  const user = new User({
    username,
    email,
    password
  });

  try {
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Email is not found');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({
    _id: user._id,
    role: user.role
  }, '1234567890');

  res.json({ token: token });
};

const logout = async (req, res) => {
  res.status(200).send('Logged out successfully');
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const { username, email, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      username,
      email,
      role
    }, { new: true }); 

    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const checkPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Korisnik nije pronađen.' });
    }

    const isPasswordValid = await user.isValidPassword(req.body.oldPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Stara lozinka nije ispravna.' });
    }

    res.status(200).json({ message: 'Stara lozinka je ispravna.' });
  } catch (error) {
    console.error('Greška prilikom provjere stare lozinke:', error);
    res.status(500).json({ message: 'Greška prilikom provjere stare lozinke.' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Korisnik nije pronađen.' });
    }

    const newPasswordHash = await user.generatePasswordHash(req.body.newPassword);
    
    user.password = newPasswordHash;

    await user.save();

    res.status(200).json({ message: 'Lozinka uspješno promijenjena.' });
  } catch (error) {
    console.error('Greška prilikom promjene lozinke:', error);
    res.status(500).json({ message: 'Greška prilikom promjene lozinke.' });
  }
};


export { register, login, logout, getUsers, getUserById, updateUser };
