const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI).then( () => {
    console.log("DB is Connected");
}).catch( (error) => {
    console.log(error);
});