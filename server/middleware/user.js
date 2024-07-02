const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res,next) => {
 
  const token = req?.cookies?.token;
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false });
    }
      
      req.user=data;

      next();
    
})}



