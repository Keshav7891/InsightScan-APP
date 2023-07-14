const express = require('express');
require('express-async-errors');
require('dotenv').config();
const morgan = require('morgan');
const userRouter = require('./routes/userRoute');
const db = require('./db/index');
const { asyncErrorHandler } = require('./middlewares/asyncErrorHandle');


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user',userRouter);


//Handle async error
app.use(asyncErrorHandler); 


app.listen(8000 , () =>{
    console.log(`server running on port http://localhost:${8000}/`);
})