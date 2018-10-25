import Router from 'express';

//Auth Login
import {check, validationResult} from "express-validator/check";
import profiles from "../../database/profiles";
import jwt from "jsonwebtoken";


const routes = Router();

routes.post('/auth/login', [check('email').isEmail()], (req, resp)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(422).json({ errors: errors.array() });
    }
    const { email,password } = req.body;

    profiles.query('SELECT * FROM profiles WHERE email = $1 AND password = $2', [email, password], (err, res) => {
        if (err)
            return next(err);

        if (res.rows.length > 0) {
            const payload = {check: true};

            const token = jwt.sign(payload, app.get('Secret'), {
                expiresIn: 1440 // expires in 24 hours
            });

            resp.json({
                message: 'authentication done',
                token: token
            });
        }
        else {
            resp.json({
                message: 'authentication failed. Try later',
            });
        }
    });
});


routes.use((req, res, next) =>{
    // check header for the token
    const token = req.headers['access-token'];

    // decode token
    if (token) {
        // verifies secret and checks if the token is expired
        jwt.verify(token, app.get('Secret'), (err, decoded) =>{
            if (err) {
                return res.json({ message: 'invalid token' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    }
    else {
        // if there is no token
        res.send({
            message: 'No token provided.'
        });
    }
});
