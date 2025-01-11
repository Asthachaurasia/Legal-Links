const bcrypt = require('bcrypt');
const lawyer = require('../models/lawyers');

const lawyerSignup = async (req, res) => {
    try {
        const { name, email, password, gender, age ,experience,category} = req.body;

        // Validate required fields for user
        if (!name || !email || !password || !gender || !age ||!experience||!category) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Missing required fields for Lawyer."
            });
        }

        // Check if the user already exists
        const existingUser  = await lawyer.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({
                success: false,
                message: "Lawyer  with this email already exists."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with uid set to _id
        const newLawyer  = await lawyer.create({
            lid: null, // You can remove this line if you don't want to set it to null initially
            name,
            age,
            email,
            password: hashedPassword,
            gender,
            role: 'lawyer',  
          
            
            experience:experience,
            category:category,

        });

        // Set uid to the newly created user's _id
        newLawyer .lid = newLawyer ._id;

        // Save the updated user
        await newLawyer .save();

       return res.status(201).json({
            success: true,
            message: "Lawyer  created successfully",
            user: {
                id: newLawyer ._id,
                email: newLawyer .email,
                role: newLawyer .role
            }
        });
    } catch (err) {
        console.error("Error during Lawyer signup:", err);
        
      return  res.status(500).json({
            success: false,
            message: "Error during signup. Please try again later."
        });
    }  
};

module.exports = lawyerSignup;