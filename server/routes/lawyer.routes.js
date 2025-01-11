const express = require('express');
const router = express.Router();
const {editLawyerProfile,fetchLawyerProfile,getAllLawyers,searchLawyers, ratelawyer} = require('../controllers/lawyer.controllers'); // Adjust the path as necessary

// Route to edit a lawyer's profile
router.put('/edit/:lid', editLawyerProfile);

// Route to fetch a lawyer's profile
router.get('/fetch/:lid', fetchLawyerProfile);

// Route to get all lawyers
router.get('/all', getAllLawyers);

// Route to search for lawyers
router.get('/search', searchLawyers);

// Route to rate a lawyer
router.post('/rate/:lid', ratelawyer);

module.exports = router;

