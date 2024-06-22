import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();
import jwt from 'jsonwebtoken';

// User registration
router.post("/", async (req, res) => {
    // Dummy dataemail: "vincent@vincentlab.net", password: "$2b$15$zqY2Q4eOoGzFpZkHJz9HS.BSfXc/HM2E/yTWa1awFmTMgN2bE72Uu", roles: ["admin", "editor", "viewer"] 
    //const users = [{ }];

    // Get to user from the database, if the user is not there return error
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) throw new Error("Invalid email or password.");

    // Compare the password with the password in the database
    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) throw new Error("Invalid email or password.");
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