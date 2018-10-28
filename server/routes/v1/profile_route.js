import Router from 'express';
import ProfileController from '../../controllers/profilesController';

const routes = Router();

routes.use('/', ((req, res, next) => {
  if (req.auth_token.profile.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorised access into this endpoint' });
  }
}));
// Profiles Routes
routes.get('/', ProfileController.getAllProfiles);
routes.get('/:id', ProfileController.getSingleProfile);
routes.put('/:id', ProfileController.updateSingleProfile);
routes.delete('/:id', ProfileController.deleteSingleProfile);
routes.post('/', ProfileController.addNewProfile);

export default routes;
