const express = require('express');
const router = express.Router();
const { createCategories,deleteCategory,getCategories,updateCategory} = require('../controllers/category.controllers');  

// Route to create a new category
router.post('/create',createCategories);

// Route to delete a category by ID
router.delete('/delete/:id', deleteCategory);

// Route to get all categories
router.get('/get', getCategories);

// Route to update a category by ID
router.put('/update/:id', updateCategory);

module.exports = router;