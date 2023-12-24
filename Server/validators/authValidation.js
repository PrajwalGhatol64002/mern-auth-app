import { body, param, query } from "express-validator";
import User from "../models/UserAuthInfo.js";
import mongoose from "mongoose";

const authVaildator = [
  body("email")
    .notEmpty()
    .trim()
    .escape()
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isLength({ max: 255 })
    .withMessage("Password is too long"),
];

export { authVaildator };
