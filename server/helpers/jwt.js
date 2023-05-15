import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../../index.js'; 

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }
  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}
export default authMiddleware;
