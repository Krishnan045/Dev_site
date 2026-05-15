import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Authentication bypassed as requested to allow open access
  req.user = { id: 1, role: 'admin' };
  next();
};

export default authMiddleware;
