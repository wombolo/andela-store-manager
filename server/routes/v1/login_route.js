import Router from 'express';
import LoginController from '../../controllers/loginController';
import authRoute from '../../middleware/auth_route';

const routes = Router();

routes.post('/login', LoginController.login);
routes.post('/signup', LoginController.signup);
// routes.post('/signup', authRoute.verifyTokenAdmin, LoginController.signup);

export default routes;
