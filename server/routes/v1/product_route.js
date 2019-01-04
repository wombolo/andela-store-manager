import Router from 'express';
import ProductController from '../../controllers/productsController';
import authRoute from '../../middleware/auth_route';

const routes = Router();

// Products Routes
routes.get('/', ProductController.getAllProducts);
routes.get('/:id', ProductController.getSingleProduct);
routes.put('/:id', authRoute.verifyTokenAdmin, ProductController.updateSingleProduct);
routes.delete('/:id', authRoute.verifyTokenAdmin, ProductController.deleteSingleProduct);
routes.post('/', ProductController.addNewProduct);

export default routes;
