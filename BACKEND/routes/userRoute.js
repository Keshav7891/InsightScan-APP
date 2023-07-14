const express = require('express');


const userController = require('../controller/userController');
const userMiddlware = require('../middlewares/userMiddleware');
const validator = require('../middlewares/validator');
const router = express.Router();


router.post('/create', validator.userValidator , validator.errorValidate , userController.createUser);
router.post('/sign-in' , validator.singInValidator , validator.errorValidate , userController.signIn);
router.post('/verify-email' , userController.verifyEmail);
router.post('/resend-verify-email' , userController.resendEmailVerificationToken);
router.post('/forget-password' , userController.forgetPassword);
router.post("/verify-password-reset-token" , userMiddlware.isValidPasswordResetToken , userController.sendResetPasswordTokenStatus);
router.post("/reset-password" , validator.passwordValidator , validator.errorValidate , userMiddlware.isValidPasswordResetToken , userController.resetPassword);




module.exports = router;