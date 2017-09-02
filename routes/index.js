const express = require('express');
const router = express.Router();
const weatherController = require('../controller/weatherController');
//get home page 

router.get('/',weatherController.homePage);
router.post('/',weatherController.showCity);
module.exports =router;