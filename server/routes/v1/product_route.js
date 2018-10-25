import Router from 'express';

import ProductController from '../../controllers/productsController';

const routes = Router();


//Products Routes
routes.get('/products', ProductController.getAllProducts);
routes.get('/products/:id', ProductController.getSingleProduct);
routes.put('/products/:id', ProductController.updateSingleProduct);
routes.delete('/products/:id', ProductController.deleteSingleProduct);
routes.post('/products', ProductController.addNewProduct);

export default routes;