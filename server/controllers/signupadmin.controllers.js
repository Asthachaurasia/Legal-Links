const bcrypt = require('bcrypt');
const admin = require('../models/admin');

const adminSignup = async (req, res) => {
    try {
        const { name, email, password, gender, age, } = req.body;

        // Validate required fields for user
        if (!name || !email || !password || !gender || !age) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Missing required fields for Admin."
            });
        }

        // Check if the user already exists
        const existingUser  = await admin.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({
                success: false,
                message: "Admin  with this email already exists."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with uid set to _id
        const newAdmin = await admin.create({
            aid: null, // You can remove this line if you don't want to set it to null initially
            name,
            age,
            email,
            password: hashedPassword,
            gender,
            role: 'admin',  
             

        });

        // Set uid to the newly created user's _id
        newAdmin .aid = newAdmin ._id;

        // Save the updated user
        await newAdmin .save();

        res.status(201).json({
            success: true,
            message: "Admin  created successfully",
            user: {
                id: newAdmin ._id,
                email: newAdmin .email,
                role: newAdmin .role
            }
        });
    } catch (err) {
        console.error("Error during Admin signup:", err);
        
        res.status(500).json({
            success: false,
            message: "Error during signup. Please try again later."
        });
    }  
};

module.exports = adminSignup;