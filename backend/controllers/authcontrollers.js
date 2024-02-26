import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToke.js";

//signup
export const signup = async (req, res) => {
    console.log("singup user");
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        //check if password matches
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password doesn't match" });
        }

        // check if user alreasy exits wiiht that name
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" })
        }

        //HASH Password Here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/
        const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyprofilepic : girlprofilepic
        });

        // don't write like this we will optimize it using
        // if else statement
        // await newUser.save();
        // res.status(201).json({
        //     _id: newUser._id,
        //     fullName: newUser.fullName,
        //     username: newUser.username,
        //     profilePic: newUser.profilePic
        // })
        if (newUser) {
            // Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
};

//login
export const login = async (req, res) => {
    console.log("login user");
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// logout
export const logout = (req, res) => {
    console.log("logout user");
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};