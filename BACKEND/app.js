const express = require('express');
const userRouter = require('./routes/userRoute');
const db = require('./db/index');


const app = express();
app.use(express.json());
app.use('/api/user',userRouter);


app.listen(8000 , () =>{
    console.log(`server running on port http://localhost:${8000}/`);
})