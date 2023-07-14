const expressValidator = require('express-validator');

exports.userValidator = [ expressValidator.check('name').trim().not().isEmpty().withMessage("Name is Missing !!!"),

                          expressValidator.check('email').normalizeEmail().isEmail().withMessage("Email is Invalid !!!"),

                          expressValidator.check('password').trim().not().isEmpty().withMessage("Password is Missing !!!").isLength({min : 8, max :20}).withMessage("password must be 8 to 20 characters long")];



                          
exports.passwordValidator = [expressValidator.check('newPassword').trim().not().isEmpty().withMessage("Password is Missing !!!").isLength({min : 8, max :20}).
                             withMessage("password must be 8 to 20 characters long")];


exports.singInValidator = [ expressValidator.check('email').normalizeEmail().isEmail().withMessage("Email is Invalid !!!"),

                            expressValidator.check('password').trim().not().isEmpty().withMessage("Password is Missing !!!")];


exports.errorValidate = (req,res,next) => {
    const error = expressValidator.validationResult(req).array();
    if(error.length !== 0){
        return res.status(403).json({ error: error[0].msg });
    }
    next();
}
