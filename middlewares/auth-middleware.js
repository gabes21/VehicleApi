import jwt from "jsonwebtoken";
import { CustomError } from "../errors/custom-error.js";

export const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return next(new CustomError("Access denied. No token provided", 401));
    }

    try {
        const decoded = jwt.verify(token, "jwtPrivateKey");
        req.user = decoded;
        next();
    } catch (error) {
        next(new CustomError("Token expired", 401));
    }
};