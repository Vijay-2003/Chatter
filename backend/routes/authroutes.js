import express from "express";
import { login, logout, signup } from "../controllers/authcontrollers.js";

const router = express.Router();


/* (req,res) => {
    console.log("signup route");
    res.send("Signup route");
} */ 
//to handle this functions we will create a seperate
//file called controllers otherwise the code will be messy
// and then it will look  like this
// router.get("/login", )

// dont write like this otherwise --- read the above note

// router.get("/signup", (req,res) => {
//     console.log("signup route");
//     res.send("Signup route");
// })

// router.get("/login", (req, res) => {
//     console.log("Login route");
//     res.send("Login Route")
// })

// router.get("/logout", (req, res) => {
//     console.log("logout route");
//     res.send("Logout route");
// })

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;