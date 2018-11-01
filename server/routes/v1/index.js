import express from 'express';
import ProductRoute from './product_route';
import ProfileRoute from './profile_route';
import SaleRoute from './sale_route';

const router = express.Router();

router.use('/products/', ProductRoute);
router.use('/sales/', SaleRoute);
router.use('/profiles/', ProfileRoute);

export default router;
