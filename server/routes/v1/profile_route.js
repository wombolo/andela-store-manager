import Router from 'express';

import ProfileController from '../../controllers/profilesController';

const routes = Router();

//Profiles Routes
routes.get('/profiles', ProfileController.getAllProfiles);
routes.get('/profiles/:id', ProfileController.getSingleProfile);
routes.put('/profiles/:id', ProfileController.updateSingleProfile);
routes.delete('/profiles/:id', ProfileController.deleteSingleProfile);
routes.post('/auth/signup',ProfileController.addNewProfile);

export default routes;