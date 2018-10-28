import Router from 'express';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const routes = Router();


export default routes.use((req, res, next) => {
  // check header for the token
  const token = req.headers['access-token'];

  // decode token
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'invalid token' });
      }
      // success
      req.auth_token = decoded;
      next();
    });
  } else {
    res.send({
      message: 'No token provided.',
    });
  }
});
