const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.awnauk9.mongodb.net/review_app').then( () => {
    console.log("DB is Connected");
}).catch( (error) => {
    console.log(error);
});