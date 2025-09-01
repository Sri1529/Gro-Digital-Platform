import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/index.js';
import { LoginApi, SignupApi } from './database/index.js';
import cors from 'cors';   
import { validateToken } from './helpers/authmiddleware.js';


const app = express();


app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,      
  })
)
const PORT = process.env.PORT 

app.use(bodyParser.json());
app.use(cookieParser());
connectDB();



app.post("/api/v1/signup",SignupApi)
app.post("/api/v1/login",LoginApi)

app.get("/api/v1/validate-token", validateToken, (req, res) => {
  try {
    console.log("headers:", req.headers);
    console.log("Auth header:", req.headers.authorization);
    
    res.status(200).json({
      success: true,
      message: "Token is valid",
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name || "User"
      }
    });
  } catch (error) {
    console.error("Token validation error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during token validation"
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
