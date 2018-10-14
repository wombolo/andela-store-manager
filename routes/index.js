import {Router} from 'express';

import ProductController from '../controllers/productController';

const routes = Router();
routes.get('/api/v1/products', ProductController.getAllProducts);
routes.get('/api/v1/product/:id', ProductController.getSingleProduct);

// export default routes;
module.exports = routes;