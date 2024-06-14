require("dotenv").config();

const express=require("express");

const bodyParser=require("body-parser");


const cookieParser = require("cookie-parser");
const userRoute=require('./routes/user')

const connectDB=require('./connection/db');
const cors=require('cors');

const PORT= 8000;


connectDB();
const app=express();
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

  




app.use('/',userRoute);
app.listen(PORT,()=>{
    console.log(`server started on port:${PORT}` )
})