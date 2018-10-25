import Router from 'express';

import SaleController from '../../controllers/salesController';

const routes = Router();

//Sales Routes
routes.get('/', SaleController.getAllSales);
routes.get('/:id', SaleController.getSingleSale);
routes.put('/:id', SaleController.updateSingleSale);
routes.delete('/:id', SaleController.deleteSingleSale);
routes.post('/',SaleController.addNewSale);


export default routes;