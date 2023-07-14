const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isVerified : {
        type : Boolean,
        required : true,
        default : false
    }
});

userSchema.methods.comparePassword = async function(password){
    const result = await bcrypt.compare(password,this.password);
    return result;
}



userSchema.pre('save', async function(next){
    //console.log(this);
    if(this.isModified('password') == true) {
       this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

module.exports = mongoose.model('User', userSchema);