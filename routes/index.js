import {Router} from 'express';

import ProductController from '../controllers/productController';

const routes = Router();
routes.get('/api/v1/products', ProductController.getAllProducts);
routes.get('/api/v1/product/:id', ProductController.getSingleProduct);
routes.put('/api/v1/product/:id', ProductController.updateSingleProduct);
routes.delete('/api/v1/product/:id', ProductController.deleteSingleProduct);
routes.post('/api/v1/products', ProductController.addNewProduct);

// export default routes;
module.exports = routes;