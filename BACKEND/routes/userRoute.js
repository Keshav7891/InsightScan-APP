const express = require('express');


const userController = require('../controller/userController');
const validator = require('../middlewares/validator');
const router = express.Router();


router.post('/', validator.userValidator , validator.userValidate  ,userController.createUser);

module.exports = router;