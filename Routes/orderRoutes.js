import express from 'express'
import { addOrder, getAllOrder, getOrderUser } from '../Controllers/orderController.js';
import { adminCheck, userCheck } from '../Middleware/authCheck.js';

const router = express.Router();

router.route('/orders').get(userCheck, adminCheck, getAllOrder).post(userCheck, addOrder);
router.route('/orders/users').get(userCheck, getOrderUser);

export default router;
