// ../routes/auth.routes.js
const express = require('express');
const signupUserController = require('../controllers/signupusers.controllers');
const signupLawyerController = require('../controllers/signuplawyer.controllers');
const signupAdminController = require('../controllers/signupadmin.controllers');


const loginController = require('../controllers/login.controllers');

const router = express.Router();

// Route for user signup
router.post('/signup/user', signupUserController);
router.post('/signup/lawyer', signupLawyerController);
router.post('/signup/admin', signupAdminController);



// Route for user login
router.post('/login', loginController);

module.exports = router;
