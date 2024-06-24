import { body, oneOf, validationResult } from 'express-validator';
import { createCustomError } from "../errors/custom-error.js";

export const validateVehicleUpdate = [
    body('type').optional().isString().notEmpty(),
    body('lock_unlock_status').optional().isString().isIn(["Lock", "Unlock"]).withMessage('Must either be Lock or Unlock only').notEmpty(),
    body('current_speed').optional().isFloat({ min: 0}).withMessage('Current speed must be a positive number').notEmpty(),
    body('battery_level').optional().isInt({ min: 0, max: 100 }).withMessage('Battery level must be a positive integer range between 0 - 100').notEmpty(),
    body('status').optional().isString().notEmpty(),
    body('location').optional().isFloat().notEmpty(),

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