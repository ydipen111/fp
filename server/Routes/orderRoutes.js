import express from 'express'
import { addOrder, getAllOrder, getOrderDetails, getOrderUser } from '../Controllers/orderController.js';
import { adminCheck, userCheck } from '../Middleware/authCheck.js';

const router = express.Router();

router.route('/orders').get(userCheck, adminCheck, getAllOrder).post(userCheck, addOrder);
router.route('/orders/users').get(userCheck, getOrderUser);

router.route('/orders/users/:id').get(userCheck, getOrderDetails);

export default router;
