const bcrypt = require('bcrypt');
const Lawyer = require('../models/lawyers'); 
const Category = require('../models/categories'); 
const mongoose = require("mongoose");
const editLawyerProfile = async (req, res) => {
    try {
        const { name, age, gender, email, password, experience, category } = req.body; // category should be an array
        const lid = req.params.lid;

        // Check if all required fields are provided
        if (!name || !age || !gender || !email || !experience || !lid) {
            return res.status(400).json({
                success: false,
                message: "All fields except category are required to update lawyer profile.",
            });
        }

        // Validate lid
        if (!mongoose.Types.ObjectId.isValid(lid)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lawyer ID.",
            });
        }

        // Prepare the update data
        let updateData = {
            name,
            email,
            gender,
            age,
          
            experience,
        };

        // Only hash the password if it is provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        // Update lawyer details
        const lawyerDetail = await Lawyer.findOneAndUpdate(
            { _id: lid },
            updateData,
            { new: true }
        );

        // Check if lawyer was found and updated
        if (!lawyerDetail) {
            return res.status(404).json({
                success: false,
                message: "Lawyer not found.",
            });
        }

        // Now add the new category if provided
        if (category) {
            // Use $addToSet to add the category to the existing array
            await Lawyer.updateOne(
                { _id: lid },
                { $addToSet: { category: category } } // Ensure unique categories
            );
        }

        // Fetch the updated lawyer details again to return
        const updatedLawyerDetail = await Lawyer.findById(lid).populate('category');

        console.log("Updated lawyer details:", updatedLawyerDetail);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            lawyer: updatedLawyerDetail,
        });
    } catch (error) {
        console.error("Error updating lawyer profile:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update profile. Please try again later.",
        });
    }
};





 

const fetchLawyerProfile = async (req, res) => {
    try {
        const lawyer_id = req.params.lid; // Assuming the ID is sent in the request body

        if (!lawyer_id) {
            return res.status(400).json({
                success: false,
                message: "Lawyer ID not received",
            });
        }

        // Find the lawyer by lid (lawyer ID)
        const lawyerDetail = await Lawyer.findOne({ lid: lawyer_id }).populate('category'); // Populate category if needed

        if (!lawyerDetail) {
            return res.status(404).json({
                success: false,
                message: "Lawyer not found",
            });
        }

        return res.status(200).json({
            success: true,
            details: {
                name: lawyerDetail.name,
                age: lawyerDetail.age,
                gender: lawyerDetail.gender,
                email: lawyerDetail.email,
                
                ratings: lawyerDetail.ratings,
                experience: lawyerDetail.experience,
                category: lawyerDetail.category, // This will be populated if you used populate
            },
        });
    } catch (error) {
        console.error("Error fetching lawyer profile:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};







const getAllLawyers = async (req, res) => {
  try {
    // Fetch all lawyers with populated user details and categories
    const lawyers = await Lawyer.find()
      .populate('category') // Assuming category is an ObjectId reference to another model
      .exec();

    // Format the lawyers data if needed
    const formattedLawyers = lawyers.map(lawyer => ({
      id: lawyer._id,
      name: lawyer.name,
      email: lawyer.email,
      gender: lawyer.gender,
      age: lawyer.age,
      
      experience: lawyer.experience,
      ratings: lawyer.ratings,
      category: lawyer.category, // This will be populated
       
    }));

    return res.status(200).json({
      success: true,
      message: "Fetched all lawyers successfully",
      lawyers: formattedLawyers,
    });
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch lawyers",
    });
  }
};





 
  

const searchLawyers = async (req, res) => {
  try {
    const { query =req.query.name} = req.query; // Get the search query from the request
    console.log("Search query:", query);
    // Validate the query
    if (!query) {
      return res.status(200).json({
        success: true,
        message: "Search query is required.",
        lawyers: [],
      });
    }

    // Use a regular expression to perform a case-insensitive search
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive

    // First, find categories that match the query
    const matchingCategories = await Category.find({ name: regex }).select('_id');

    // Extract category IDs if any categories were found
    const categoryIds = matchingCategories.map(category => category._id);

    // Search lawyers by name or by matching category IDs
    const lawyers = await Lawyer.find({
      $or: [
        { name: regex },
        { category: { $in: categoryIds } } // Search by category IDs
      ]
    }).populate('category'); // Populate category if needed

    // Check if any lawyers were found
    if (lawyers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No lawyers found matching the search criteria.",
        lawyers: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lawyers found successfully.",
      lawyers,
    });
  } catch (error) {
    console.error("Error searching lawyers:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to search lawyers.",
    });
  }
};






const ratelawyer = async (req, res) => {
    try {
        let { ratings } = req.body;
        const lawyer_id = req.params.lid;

        // Check if lawyer_id and ratings are provided
        if (!lawyer_id || ratings === undefined) {
            return res.status(400).json({
                success: false,
                message: "Lawyer ID or rating is missing. Please try again later.",
            });
        }

        // Parse ratings to ensure it's a valid number
        ratings = parseFloat(ratings);
        if (isNaN(ratings)) {
            return res.status(400).json({
                success: false,
                message: "Invalid rating value. Please enter a valid number.",
            });
        }

        // Find the lawyer by ID
        const lawyer = await Lawyer.findOne({ _id: lawyer_id });

        // Check if the lawyer exists
        if (!lawyer) {
            return res.status(404).json({
                success: false,
                message: "Lawyer not found.",
            });
        }

        // Calculate the new rating (average)
        const newRating = (lawyer.ratings + ratings) / 2;

        // Update the lawyer's rating
        const updatedLawyer = await Lawyer.findOneAndUpdate(
            { _id: lawyer_id },
            { ratings: newRating }, 
            { new: true } 
        );

        console.log("Updated rating: ", updatedLawyer);

        return res.status(200).json({
            success: true,
            message: "Lawyer rated successfully.",
            lawyer: updatedLawyer,
        });
    } catch (error) {
        console.error("Error rating lawyer:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while rating the lawyer. Please try again later.",
        });
    }
};






module.exports = {
    editLawyerProfile,
    fetchLawyerProfile,
    getAllLawyers,
    searchLawyers,
    ratelawyer
};



