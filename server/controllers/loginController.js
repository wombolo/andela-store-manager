import { validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';
import profiles from '../database/db';

const { JWT_SECRET } = process.env;

class authController {
  // DECIPHER WHO's ADMIN & WHO's NOT THen select links

  static login(req, resp, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    profiles.query('SELECT id, firstname, lastname,email,role FROM profiles WHERE email = $1 AND password = $2', [email, password], (err, res) => {
      if (err) { return next(err); }

      if (res.rows.length > 0) {
        const payload = {
          profile: res.rows[0],
        };

        const token = jwt.sign(payload, JWT_SECRET, {
          expiresIn: 1440, // expires in 24 hours
        });

        resp.status(201).json({
          message: 'authentication done',
          token,
        });
      } else {
        resp.status(403).json({ message: 'authentication failed. Try later' });
      }
    });
  }


  static signup(req, resp, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(422).json({ errors: errors.array() });
    }
    const {
      firstname, lastname, email, role, password,
    } = req.body;

    profiles.query('INSERT INTO profiles (firstname, lastname,email,role, password )VALUES ($1, $2, $3, $4, $5 ) returning *', [firstname, lastname, email, role, password], (err, res) => {
      if (err) { return next(err); }

      if (res.rows.length > 0) {
        const payload = {
          profile: res.rows[0],
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 1440 });

        resp.status(201).json({
          message: 'authentication done',
          token,
        });
      } else {
        resp.status(403).json({ message: 'Signup/ authentication failed. Try later' });
      }
    });
  }
}

export default authController;
