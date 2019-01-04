import dbConfig from '../database/db';
import helpers from './Helpers';

class profilesController {
  // Get all profiles
  static getAllProfiles(req, resp, next) {
    dbConfig.query('SELECT id, firstname, lastname, email, role, image FROM profiles', (err, res) => {
      if (err) { return next(err); }

      return resp.status(200).json({
        profiles: res.rows,
        message: 'All the profiles',
      });
    });
  }

  // Get a single profile
  static getSingleProfile(req, resp, next) {
    if (!helpers.isNumber(req.params.id)) { return resp.status(400).json({ message: 'Please specify a number in the parameters list' }); }

    let requestId;
    if (req.auth_token.profile.role === 'admin') {
      requestId = req.params.id;
    } else {
      requestId = req.auth_token.profile.id;
    }

    dbConfig.query('SELECT id, firstname, lastname, email, role, image FROM profiles WHERE id = $1', [requestId], (err, res) => {
      if (err) { return next(err); }

      // If any record is found... Else
      if (res.rows.length > 0) {
        return resp.status(200).json({
          profile: res.rows[0],
          message: 'A single profile record',
        });
      }
      return resp.status(404).json({ message: 'profile not found' });
    });
  }


  // Update a single profile
  static updateSingleProfile(req, resp, next) {
    if (!helpers.isNumber(req.params.id)) { return resp.status(400).json({ message: 'Please specify a number in the parameters list' }); }

    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
      return resp.status(400).json({ message: 'Missing information: Names, Email or Password. Try again. Profile not updated' });
    }

    let requestId;
    if (req.auth_token.profile.role === 'admin') {
      requestId = req.params.id;
    } else {
      requestId = req.auth_token.profile.id;
    }

    let profileFound;


    dbConfig.query('SELECT * FROM profiles WHERE id = $1', [requestId], (err, res) => {
      if (err) { return next(err); }

      profileFound = res.rows[0];


      if (!profileFound) {
        return resp.status(404).send({ message: 'profile not found', error: err });
      }

      const updatedProfile = {
        id: profileFound.id,
        firstname: req.body.firstname || profileFound.firstname,
        lastname: req.body.lastname || profileFound.lastname,
        email: req.body.email || profileFound.email,
        role: req.body.role || profileFound.role,
        image: req.body.image || profileFound.image,
        password: req.body.password || profileFound.password,
      };


      const {
        firstname, lastname, email, role, image, password,
      } = updatedProfile;

      const hashPassword = helpers.hashPassword(password);
      // Update profile
      dbConfig.query('UPDATE profiles SET (firstname, lastname, email, role,image,password) = ($1,$2,$3,$4,$5,$6) WHERE id = $7 RETURNING *',
        [firstname, lastname, email, role, image, hashPassword, requestId], (errr, ress) => {
          if (errr) { return next(errr); }

          if (ress && ress.rows.length > 0) {
            return resp.status(200).json({
              profile: ress.rows[0],
              message: 'profile updated Successfully',
            });
          }

          return resp.status(400).json({
            message: `${errr}. profile not updated`,
          });
        });
    });
  }


  static deleteSingleProfile(req, resp, next) {
    if (!helpers.isNumber(req.params.id)) { return resp.status(400).json({ message: 'Please specify a number in the parameters list' }); }

    const id = parseInt(req.params.id, 10);

    dbConfig.query('DELETE FROM profiles WHERE id = $1 RETURNING id, firstname, lastname,email, role,image', [id], (err, res) => {
      if (err) next(err);

      // If any record is found... Else
      if (res && res.rows.length > 0) {
        return resp.status(200).json({
          profile: res.rows[0],
          message: 'profile deleted',
        });
      }
      return resp.status(404).json({
        message: `${err}. profile not found`,
      });
    });
  }


  // Create a single profile
  static addNewProfile(req, resp, next) {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
      return resp.status(400).json({
        message: 'A required detail is missing: Either names or role. Try again. Profile not created',
      });
    }

    const newProfile = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      role: req.body.role || 'store_attendant',
      image: req.body.image || 'images/default_profile.png',
      password: '12345',
    };

    const {
      firstname, lastname, email, role, image, password,
    } = newProfile;

    const hashPassword = helpers.hashPassword(password);


    // Create profile
    dbConfig.query('INSERT INTO profiles (firstname, lastname,email, role,image,password) VALUES ($1,$2,$3,$4,$5, $6) RETURNING id, firstname, lastname,email, role,image',
      [firstname, lastname, email, role, image, hashPassword], (err, res) => {
        if (err) { next(err); }

        if (res && res.rows.length > 0) {
          return resp.status(201).json({
            newProfile: res.rows[0],
            message: 'profile created Successfully',
          });
        }

        return resp.status(400).json({
          message: `${err}. profile not created`,
        });
      });
  }
}

export default profilesController;
