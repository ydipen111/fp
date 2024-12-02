import express from "express";
import { login, signup } from "../Controllers/authController.js";
import validator from "express-joi-validation";
import Joi from "joi";

const validate = validator.createValidator({});
const router = express.Router();


const signUpSchema = Joi.object({
  fullname: Joi.string().min(4).max(24).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(40).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(14).required()
})


router.route('/users/signup').post(validate.body(signUpSchema), signup)
router.route('/users/login').post(validate.body(loginSchema), login)

export default router;