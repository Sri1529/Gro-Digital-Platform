import { getDB } from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefreshkey";

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
};

export const SignupApi = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const client = getDB();

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email
    `;
        const values = [name, email, hashedPassword];

        const result = await client.query(query, values);

        res.status(200).json({
            message: "User signed up successfully",
            user: result.rows[0],
        });
    } catch (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const LoginApi = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and Password are required" });
    }

    try {
        const client = getDB();

        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await client.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const { accessToken, refreshToken } = generateTokens(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.setHeader("x-access-token", accessToken);
        res.json({
            message: "Login successful",
            accessToken,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
