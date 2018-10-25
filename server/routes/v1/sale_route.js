import Router from 'express';

import SaleController from '../../controllers/salesController';

const routes = Router();


//Sales Routes
routes.get('/sales', SaleController.getAllSales);
routes.get('/sales/:id', SaleController.getSingleSale);
routes.put('/sales/:id', SaleController.updateSingleSale);
routes.delete('/sales/:id', SaleController.deleteSingleSale);
routes.post('/sales',SaleController.addNewSale);



export default routes;