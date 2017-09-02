const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationController');
//get home page 

router.get('/',locationController.homePage);
module.exports =router;