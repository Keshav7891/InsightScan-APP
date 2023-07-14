const { isValidObjectId } = require('mongoose');
const PasswordResetToken = require('../models/passwordResetToken');
const { sendError } = require('../utils/helper');
exports.isValidPasswordResetToken = async(req,res,next) => {
    const {token , userId} = req.body;

    if(!token.trim()){
        return sendError(res , 'Invalid password reset token');
    }

    if(isValidObjectId(userId) == false){
        return sendError(res, 'Invalid User ID');
    }

    const resetToken = await PasswordResetToken.findOne({owner : userId});
    if(resetToken == null) {
        return sendError(res, 'Unauthorized access , Invalid password reset token');
    }

    const matched = await resetToken.compareToken(token);

    if(matched != true){
        return sendError(res, 'Unauthorized access, Invalid Request');
    }


    req.resetToken = resetToken;



    next();
}