const Category = require("../models/categories");

const createCategories = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if all required fields are provided
        if (!name  ) {
            return res.status(400).json({ // Use 400 for bad request
                success: false,
                message: "All fields are required in category creation."
            });
        }

        // Create a new category
        const newCategory = await Category.create({
            category_id: null, // Initialize category_id as null
            name: name,
            
        });

        // Set the category_id to the newly created category's _id
        newCategory.category_id = newCategory._id;
        await newCategory.save(); // Save the updated category

        return res.status(201).json({ // Use 201 for resource creation
            success: true,
            message: "Category created successfully.",
            category: newCategory.category_id  
        });
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to create category."
        });
    }
};






const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the category ID is passed as a URL parameter

        // Check if the category exists
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        // Delete the category
        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete category.",
        });
    }
};






// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Retrieve all categories from the database

        return res.status(200).json({
            success: true,
            message: "Categories retrieved successfully.",
            categories: categories, // Return the list of categories
        });
    } catch (error) {
        console.error("Error retrieving categories:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve categories.",
        });
    }
};

 





// Update a category by ID
const updateCategory = async (req, res) => {
    const { id } = req.params; // Get the category ID from the request parameters
    const { name } = req.body; // Get the updated fields from the request body

    try {
        // Find the category by ID and update it
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name  }, //30 Fields to update
            { new: true, runValidators: true } // Options: return the updated document and run validators
        );

        // Check if the category was found and updated
        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            category: updatedCategory // Return the updated category
        });
    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update category."
        });
    }
};

 


module.exports = {
    createCategories,
    deleteCategory,
    getCategories,
    updateCategory
};