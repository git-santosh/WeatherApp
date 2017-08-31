const express = require('express');
const router = express.Router();
const weatherController = require('../controller/weatherController');
//get home page 

router.get('/',weatherController.homePage);

module.exports =router;