import { validationResult } from "express-validator";

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    const statusCode = 400;
    const message = "Validation Error";

    return res.status(statusCode).json({
      success: false,
      message,
      errors:errorMessages
    });
  }
  next();
};

export default validationErrorHandler;
