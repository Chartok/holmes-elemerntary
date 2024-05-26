const { AuthenticationError } = require('apollo-server-express');

const jwt = require('jsonwebtoken');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer')[ 1 ];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECERET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
  }
  throw new AuthenticationError('Authentication must be provided');
};
