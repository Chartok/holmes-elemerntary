// const { GraphQLError } = require('graphql');
// const jwt = require('jsonwebtoken');
// module.exports = ({ req }) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//         const token = authHeader.split('Bearer')[1];
//         if (token) {
//             try {
//                 const user = jwt.verify(token, process.env.SECERET_KEY);
//                 return user;
//             }
//             catch (error) {
//                 throw new GraphQLError('Invalid/Expired token');
//             }
//         }
//     }
//     throw new GraphQLError('Authentication must be provided');
// };
// export {};
