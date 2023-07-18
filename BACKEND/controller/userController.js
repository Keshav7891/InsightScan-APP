const User = require('../models/userModel');
const EmailVerificationToken = require('../models/emailVerificationToken');
const { isValidObjectId } = require('mongoose');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError, generateRandomByte } = require('../utils/helper');
const PasswordResetToken = require('../models/passwordResetToken');
const jwt = require('jsonwebtoken');


exports.createUser = async(req,res) => {
    const {name , email , password} = req.body;

    //Check if the user already exists
    const oldUser = await User.findOne({email: email});
    if(oldUser != undefined) {
        return res.status(401).json({error : "This Email is already in use !!!"});
    }


    //Create New user
    const newUser = new User({name : name, email : email, password : password});
    await newUser.save();


    //Generating an OTP token and saving in DB
    let OTP = generateOTP();
    const newEmailverificationToken = new EmailVerificationToken({owner: newUser._id , token : OTP});
    await newEmailverificationToken.save();


    //Sending The OTP Email.
    var transport = generateMailTransporter();
    transport.sendMail({
        from : 'verification@insightscan.tv',
        to : newUser.email,
        subject : 'Verification Email',
        html : `
            <p>Your Verification OTP : </p>
            <h1>${OTP}</h1>
        `
    });
    return res.status(201).json({user : {
        id : newUser._id,
        name : newUser.name,
        email : newUser.email,
    }});
};








exports.verifyEmail = async (req,res) => {
    const {userId , OTP} = req.body;

    if(!isValidObjectId(userId)){
        return res.status(401).json({error : "Invalid User"});
    }

    const user = await User.findById(userId);
    if(user == null){
        return res.status(404).json({error : "User Not Found"});
    }
    if(user.isVerified == true){
        return res.status(200).json({error : "User Already Verified"});
    }

    const token =  await EmailVerificationToken.findOne({owner : user._id});

    if(token == null){
        return res.status(404).json({error : "Token Not Found"});
    }

    const isMatched = await token.compareToken(OTP);

    if(isMatched == false){
        return res.status(401).json({error : "Submit a Valid OTP"});
    }

    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id);

    res.json({message :'Your Email is Verified.'});


    var transport = generateMailTransporter();
    transport.sendMail({
        from : 'verification@insightscan.tv',
        to : user.email,
        subject : 'Welcome Email',
        html : `
            <p>Welcome to Insight Scan : Review App</p>
        `
    });

};







exports.resendEmailVerificationToken = async (req,res) => {
    const {userId} = req.body;

    const user = await User.findById(userId);

    if(user == null){
        return res.status(404).json({error : "User Not Found"});
    }

    if(user.isVerified == true){
        return res.status(200).json({error : "User Already Verified"});
    }

    const alreadyExistingtoken =  await EmailVerificationToken.findOne({owner : user._id});

    if(alreadyExistingtoken != null){
        return res.status(200).json({error : "User OTP is Still Valid !! , Only After One Hour You Can Request For Another Token"});
    }


    //Generating an OTP token and saving in DB
    let OTP = generateOTP();


    //Sending The OTP Email.
    var transport = generateMailTransporter();
    transport.sendMail({
        from : 'verification@insightscan.tv',
        to : user.email,
        subject : 'Verification Email',
        html : `
            <p>Your New Verification OTP : </p>
            <h1>${OTP}</h1>
        `
    });
    return res.status(201).json({message : "Please Verify your email . OTP is sent to your email address !!"});

}






exports.forgetPassword = async(req,res) => {
    const {email} = req.body;

    if(email == null){
        return sendError(res,'Email Is Required !!');
    }

    const user = await User.findOne({email : email});
    if(user == null){
            return sendError(res,'User Not Found!!' , 404);
    }

    const existingToken = await PasswordResetToken.findOne({owner : user._id});
    if(existingToken != null){
        return sendError(res,'Password Reset Link is Still Valid!!, Only After One Hour You Can Request For New Reset Link');
    }


    const token = await generateRandomByte();
    const newPasswordResetToken = new PasswordResetToken({owner : user._id, token : token});

    await newPasswordResetToken.save();

    const resetPasswordUrl = `https://localhost:3000/reset-password?token=${token}&id=${user._id}`;
    var transport = generateMailTransporter();
    transport.sendMail({
        from : 'security@insightscan.tv',
        to : user.email,
        subject : 'Password Reset Link Email',
        html : `
            <p>Click Here To Reset Your Password : </p>
            <a href = '${resetPasswordUrl}'>Reset Paasword</a>
        `
    });

    res.json({message : 'Password Reset Link Sent To Your Email !!!'});
};





exports.sendResetPasswordTokenStatus = (req,res) => {
    return res.json({TokenValidity : true});
}







exports.resetPassword = async(req,res) => {
    const {token , userId , newPassword} = req.body;

    //console.log("hello World 1");
    const user = await User.findById(userId);
    //console.log("hello World 2");
    const matched = await user.comparePassword(newPassword);
    if(matched === true){
        return sendError(res, "The New Password Must Be Different From The Old One !!!!!")
    }
    

    user.password = newPassword;
    await user.save();

    await PasswordResetToken.findByIdAndDelete(req.resetToken._id);


    var transport = generateMailTransporter();
    transport.sendMail({
        from : 'security@insightscan.tv',
        to : user.email,
        subject : 'Password Reset Successfully',
        html : `
            <h1>Password Reset Success</h1>
            <p>Login with your new updated password !!!</p>
        `
    });

    res.json({message : "Password Reset Successfully , Login with new password !!!!"});
};





exports.signIn = async(req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email : email});
    if(user == null){
        return sendError(res,'User/Password Not Found!!', 404);
    }

    const matched = await user.comparePassword(password);
    if(matched === false){
            return sendError(res,'User/Password Not Found!!', 404);
    }

    const jwtToken = jwt.sign({userId : user._id} , process.env.JWT_SECRET);

    res.json({ user : {
        _id : user._id,
        name : user.name,
        email : user.email,
        token : jwtToken
    }});
}