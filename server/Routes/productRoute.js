import express from "express";
import { createProducts, getProducts, getTopProducts, removeProducts } from "../Controllers/productController.js";
import { adminCheck, userCheck } from "../Middleware/authCheck.js";
import { fileCheck } from "../Middleware/fileCheck.js";

const router = express.Router();


router.route('/products').get(getProducts).post(userCheck, adminCheck, fileCheck, createProducts);
router.route('/getTopProducts').get(getTopProducts, getProducts)
router.route('/:id').get().patch().delete(removeProducts)

export default router;