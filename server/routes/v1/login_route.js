import Router from 'express';
import { check } from 'express-validator/check';
import LoginController from '../../controllers/loginController';

const routes = Router();

routes.post('/login', [check('email').isEmail()], LoginController.login);
// Password must be 5 digits long
routes.post('/signup', [check('email').isEmail(), check(['firstname', 'lastname', 'role']).isLength({ min: 1 }), check(['password']).isLength({ min: 5 })], LoginController.signup);

export default routes;
