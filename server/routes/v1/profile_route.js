import Router from 'express';
import ProfileController from '../../controllers/profilesController';
import authRoute from '../../middleware/auth_route';

const routes = Router();

// Profiles Routes
routes.get('/', authRoute.verifyTokenAdmin, ProfileController.getAllProfiles);

// Store attendant can do these ffg:
routes.get('/:id', ProfileController.getSingleProfile);
routes.put('/:id', ProfileController.updateSingleProfile);

routes.delete('/:id', authRoute.verifyTokenAdmin, ProfileController.deleteSingleProfile);
routes.post('/', authRoute.verifyTokenAdmin, ProfileController.addNewProfile);

export default routes;
