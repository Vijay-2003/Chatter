import User from "../models/user.model.js";

 export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        
        //find() will find all users along with logged in user we dont want that
        //find({_id: {$ne: loggedInUserId}}) will fetch all users except logged user
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUserForSidebar controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
 }