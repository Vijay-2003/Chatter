// Deployment

import path from "path";

// Deployment

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authroutes.js"
import messageRoutes from "./routes/messageroutes.js";
import userRoutes from "./routes/userroutes.js";

import connectToMongoDB from "./db/connectToMongodb.js";
import { app, server } from "./socket/socket.js";
// const app = express();
const PORT = process.env.PORT || 5000;

// Deployment

const __dirname = path.resolve();

// Deployment

dotenv.config();

app.use(express.json()); // to parse the incoming requests with json payload (from req.body)
app.use(cookieParser());
// app.get("/", (req, res) => {
//     // root route http://localhost:5000/
//     res.send("Hello world!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Deployment

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Deployment

/* this gets really messy so we will create authroutes whenver /api/auth" 

// app.get("/api/auth/signup", (req, res) => {
//     console.log("Signup route");
// });

// app.get("/api/auth/login", (req, res) => {
//     console.log("Login route");
// });

// app.get("api/auth/logout", (req, res) => {
//     console.log("Logout route");
// });
*/

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on ${PORT}`)
})
