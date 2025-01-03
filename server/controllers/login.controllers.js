const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); 
const lawyer = require('../models/lawyers');
const admin = require('../models/admin');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required " });
        }
        // Find user across all roles
        const user = await User.findOne({ email }) || 
                     await lawyer.findOne({ email }) || 
                     await admin.findOne({ email });

        // Generic message for invalid email or password
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET  ,  // Ensure secret exists
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name:user.name
            }
        });
    } catch (err) {
        console.error("Error logging in user:", err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }

        res.status(500).json({ message: "Error logging in user. Please try again later." });
    }
};

module.exports = login;
