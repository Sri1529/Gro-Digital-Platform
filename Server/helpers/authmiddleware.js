import jwt from "jsonwebtoken";
import { getDB } from "../db/index.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefreshkey";

export const validateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) return res.status(401).json({ error: "No access token provided" });

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);

        const client = getDB();
        const result = await client.query("SELECT id, email, username FROM users WHERE id = $1", [decoded.id]);
        if (result.rows.length === 0) return res.status(401).json({ error: "User not found" });

        const user = result.rows[0];
        req.user = { id: user.id, email: user.email, name: user.username };
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) return res.status(401).json({ error: "Refresh token missing, please login" });

            try {
                const decodedRefresh = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
                const client = getDB();
                const result = await client.query("SELECT id, email, username FROM users WHERE id = $1", [decodedRefresh.id]);
                if (result.rows.length === 0) return res.status(401).json({ error: "User not found" });

                const user = result.rows[0];
                console.log("creating new token")
                // Generate new access token
                const newAccessToken = jwt.sign(
                    { id: user.id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: "15m" }
                );

                res.setHeader("x-access-token", newAccessToken);
                req.user = { id: user.id, email: user.email, name: user.username };
                next();
            } catch (refreshErr) {
                console.error("Refresh token error:", refreshErr);
                return res.status(401).json({ error: "Invalid refresh token, please login again" });
            }
        } else {
            console.error("Access token error:", err);
            return res.status(401).json({ error: "Invalid access token" });
        }
    }
};
