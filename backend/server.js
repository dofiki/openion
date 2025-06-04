import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";

import connectDB from "./config/db.js";
import configurePassport from "./config/passport.js";
import loginRoutes from "./routes/login.routes.js";
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";

const app = express();

connectDB();

// Enable CORS for frontend origin with credentials (cookies)
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true,                 // allow sending cookies
}));

// Parse JSON bodies
app.use(express.json());

// Session middleware setup with MongoDB store
app.use(session({
  secret: process.env.SESSION_SECRET || "defaultSecret",
  resave: false,
  saveUninitialized: false, // recommended for login sessions
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
    collectionName: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,              // secure your cookie
    // secure: true,             // enable on production with HTTPS
  }
}));

// Initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

// Mount routes
app.use("/auth", loginRoutes);     
app.use("/api/posts", postRoutes);    
app.use("/api/comments", commentRoutes); 
app.use("/api/users", userRoutes);     

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
