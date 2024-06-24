import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createCustomError } from "../errors/custom-error.js";

const router = express.Router();
import jwt from 'jsonwebtoken';

// User login
router.post("/", async (req, res, next) => {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        if (!user) {
            return next(createCustomError("Invalid email or password", 400));
        }
    }

    // Compare the password with the password in the database
    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
        return next(createCustomError("Invalid email or password", 400));
    }
    const token = jwt.sign({
        id: user.id,
        roles: user.roles,
    }, "jwtPrivateKey", { expiresIn: "15m" });

    res.send({
        ok: true,
        token: token
    });
});

export default router;