import Router from 'express';

import ProductController from '../../controllers/productsController';

const routes = Router();
//Products Routes
routes.get('/', ProductController.getAllProducts);
routes.get('/:id', ProductController.getSingleProduct);
routes.put('/:id', ProductController.updateSingleProduct);
routes.delete('/:id', ProductController.deleteSingleProduct);
routes.post('/', ProductController.addNewProduct);


export default routes;