import { body, validationResult } from 'express-validator';
import { createCustomError } from "../errors/custom-error.js";

export const validateVehicleCreate = [
    body('type').notEmpty().withMessage("Must not be empty").isString(),
    body('lock_unlock_status').isString().isIn(["Lock", "Unlock"]).withMessage('lock_unlock_status must either be Lock or Unlock only'),
    body('current_speed').notEmpty().withMessage("Must not be empty").isFloat({ min: 0}).withMessage('Current speed must be a positive number'),
    body('battery_level').notEmpty().withMessage("Must not be empty").isInt({ min: 0, max: 100 }).withMessage('Battery level must be a positive integer range between 0 - 100'),
    body('status').notEmpty().withMessage("Must not be empty").isString(),
    body('location').notEmpty().withMessage("Must not be empty").isFloat(),

    (req, res, next) => {
        const errors = validationResult(req);
        const errorArray = errors.array({ onlyFirstError: true });
        if (errorArray.length > 0) {
            return next(createCustomError(
                "Invalid input: " + errorArray.map(err => `{${err.path}: ${err.msg}}`).join(', '),
                400
            ));
        }
        next();
    }
];