import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    //generate JWT_SECRET using gitbash typing -> openssl rand -base64 32 in ur git bash terminal
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '999d'
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // Milisecond format
        httpOnly: true, // prevent XSS attacks -> cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request foregry attacks
        secure: process.env.NODE_ENV !== "development"
    });
};

export default generateTokenAndSetCookie;