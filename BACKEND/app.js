const express = require('express');
require('express-async-errors');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const db = require('./db/index');
const { asyncErrorHandler } = require('./middlewares/asyncErrorHandle');
const { handleNotFound } = require('./utils/helper');


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user',userRouter);



app.use('/*' , handleNotFound);


//Handle async error
app.use(asyncErrorHandler); 


app.listen(8000 , () =>{
    console.log(`server running on port http://localhost:${8000}/`);
})