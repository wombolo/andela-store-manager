import Router from 'express';

import ProductController from '../controllers/productsController';
import SaleController from '../controllers/salesController';
import ProfileController from '../controllers/profilesController';

const routes = Router();
//Products Routes
routes.get('/products', ProductController.getAllProducts);
routes.get('/products/:id', ProductController.getSingleProduct);
routes.put('/products/:id', ProductController.updateSingleProduct);
routes.delete('/products/:id', ProductController.deleteSingleProduct);
routes.post('/products', ProductController.addNewProduct);


//Sales Routes
routes.get('/sales', SaleController.getAllSales);
routes.get('/sales/:id', SaleController.getSingleSale);
routes.put('/sales/:id', SaleController.updateSingleSale);
routes.delete('/sales/:id', SaleController.deleteSingleSale);
routes.post('/sales',SaleController.addNewSale);


//Profiles Routes
routes.get('/profiles', ProfileController.getAllProfiles);
routes.get('/profiles/:id', ProfileController.getSingleProfile);
routes.put('/profiles/:id', ProfileController.updateSingleProfile);
routes.delete('/profiles/:id', ProfileController.deleteSingleProfile);
routes.post('/profiles',ProfileController.addNewProfile);

export default routes;