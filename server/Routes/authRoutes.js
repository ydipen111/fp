import express from "express";
import { getUserProfile, login, signup, updateUserProfile } from "../Controllers/authController.js";
import validator from "express-joi-validation";
import Joi from "joi";
import { userCheck } from "../Middleware/authCheck.js";

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
router.route('/profile').get(userCheck, getUserProfile)
router.route('/profile').patch(userCheck, updateUserProfile)
export default router;