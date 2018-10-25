import Router from 'express';

import ProfileController from '../../controllers/profilesController';

const routes = Router();
//Profiles Routes
routes.get('/', ProfileController.getAllProfiles);
routes.get('/:id', ProfileController.getSingleProfile);
routes.put('/:id', ProfileController.updateSingleProfile);
routes.delete('/:id', ProfileController.deleteSingleProfile);
routes.post('/',ProfileController.addNewProfile);

export default routes;