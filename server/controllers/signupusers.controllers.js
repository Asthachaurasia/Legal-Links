const bcrypt = require('bcrypt');
const User = require('../models/users');

const userSignup = async (req, res) => {
    try {
        const { name, email, password, gender, age } = req.body;

        // Validate required fields for user
        if (!name || !email || !password || !gender || !age) {
            console.log("validation error all fields are required");
            return res.status(400).json({
                success: false,
                message: "Validation Error: Missing required fields for user."
            });
        }

        // Check if the user already exists
        const existingUser  = await User.findOne({ email });

        if (existingUser ) {
            console.log("user already exist");
            return res.status(400).json({
                success: false,
                message: "User  with this email already exists."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with uid set to _id
        const newUser  = await User.create({
            uid: null, // You can remove this line if you don't want to set it to null initially
            name,
            age,
            email,
            password: hashedPassword,
            gender,
            role: 'user', // Default role is user
        });

        // Set uid to the newly created user's _id
        newUser .uid = newUser ._id;

        // Save the updated user
        await newUser .save();

       return  res.status(201).json({
            success: true,
            message: "User  created successfully",
            user: {
                id: newUser ._id,
                email: newUser .email,
                role: newUser .role
            }
        });
    } catch (err) {
        console.error("Error during user signup:", err);
        
       return res.status(500).json({
            success: false,
            message: "Error during signup. Please try again later."
        });
    }  
};

module.exports = userSignup;