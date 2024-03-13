import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Access Denied');

  const token = authHeader.split(' ')[1]; 
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, '1234567890');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

export default verifyToken;