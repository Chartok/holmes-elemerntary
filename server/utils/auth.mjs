import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Use type guard to check if decoded is of type JwtPayload
    if (typeof decoded !== 'string' && 'user' in decoded) {
      req.user = decoded.user;
    } else {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
