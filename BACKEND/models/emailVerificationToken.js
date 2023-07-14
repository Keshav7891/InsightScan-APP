// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "c1c619506f8a16",
//       pass: "51db4f09d019ee"
//     }
//   });


const mongoose  = require("mongoose");
const bcrypt = require('bcrypt');

const emailVerificationTokenSchema = mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    token : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        expires : 3600,
        default : Date.now
    }
});

emailVerificationTokenSchema.pre('save', async function(next){
    if(this.isModified('token' == true)){
        this.token = await bcrypt.hash(this.token, 10);
    }
    next();
});

//Creating method to verify DB OTP and User Entered OTP
emailVerificationTokenSchema.methods.compareToken = async function(token){
    const result = await bcrypt.compare(token,this.token);
    return result;
}

module.exports = mongoose.model('EmailVerificationToken' , emailVerificationTokenSchema);