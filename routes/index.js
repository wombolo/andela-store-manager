const Router = require('express').Router;

const ProductController = require('../controllers/productsController');
const SaleController  = require('../controllers/salesController');
const ProfileController = require('../controllers/profilesController');

const routes = Router();
//index route

routes.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//Products Routes
routes.get('/api/v1/products', ProductController.getAllProducts);
routes.get('/api/v1/product/:id', ProductController.getSingleProduct);
routes.put('/api/v1/product/:id', ProductController.updateSingleProduct);
routes.delete('/api/v1/product/:id', ProductController.deleteSingleProduct);
routes.post('/api/v1/products', ProductController.addNewProduct);


//Sales Routes
routes.get('/api/v1/sales', SaleController.getAllSales);
routes.get('/api/v1/sale/:id', SaleController.getSingleSale);
routes.put('/api/v1/sale/:id', SaleController.updateSingleSale);
routes.delete('/api/v1/sale/:id', SaleController.deleteSingleSale);
routes.post('/api/v1/sales',SaleController.addNewSale);


//Profiles Routes
routes.get('/api/v1/profiles', ProfileController.getAllProfiles);
routes.get('/api/v1/profile/:id', ProfileController.getSingleProfile);
routes.put('/api/v1/profile/:id', ProfileController.updateSingleProfile);
routes.delete('/api/v1/profile/:id', ProfileController.deleteSingleProfile);
routes.post('/api/v1/profiles',ProfileController.addNewProfile);

module.exports = routes;