import Router from 'express';
import SaleController from '../../controllers/salesController';
import authRoute from '../../middleware/auth_route';

const routes = Router();

// Sales Routes
// routes.get('/', authRoute.verifyTokenAdmin, SaleController.getAllSales);
routes.get('/', SaleController.getAllSales);
routes.get('/:id', SaleController.getSingleSale);
// routes.put('/:id', authRoute.verifyTokenAdmin, SaleController.updateSingleSale);
routes.delete('/:id', authRoute.verifyTokenAdmin, SaleController.deleteSingleSale);
routes.post('/', SaleController.addNewSale);

export default routes;
