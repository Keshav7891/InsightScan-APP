const User = require('../models/userModel');

exports.createUser = async(req,res) => {
    const {name , email , password} = req.body;

    const oldUser = await User.findOne({email: email});

    if(oldUser != undefined) {
        return res.status(401).json({error : "This Email is already in use !!!"});
    }


    const newUser = new User({name, email, password});
    await newUser.save();
    return res.status(201).json({user : newUser});
};