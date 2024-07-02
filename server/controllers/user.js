const User = require("../models/user");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { name, email,password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({name,email,password });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
  return  res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email',success:false }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email',success:false }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true,
      user:{
      
      _id:user._id,
      name:user.name,
      email:user.email,
      profilePicture:user.profilePicture
      
      
     } ,token});
     next()
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in Login User", success: false})

  }
}


module.exports.updateUser=async (req,res,next)=>{
  try {
    
    const updates = {
      name: req.body.name,
      email: req.body.email,
      profilePicture: req.body.profilePicture,
    };
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      updates.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );
    return res.status(200).send({
      message: "Profile Updated Successfully",
      success: true,
      user
      
    });
    
    
  } catch (error) {
 return res.status(500).json({message:'error in updating user',error,success:false})
  }
}
module.exports.Logout=(req,res,next)=>{
  try {
    res.clearCookie("token")
    .status(200)
    .json({success:true,message:'user logged out successfully'});
  } catch (error) {
 return res.status(500).json({message:'error in logging out',error})
  }
}
module.exports.deleteUser=async(req,res)=>{
  try {
    const id=req.params.id;
const user=await User.findByIdAndDelete(id);
if(!user)return res.status(400).json({message:'User Not Found ',success:false});

res.clearCookie('token').status(200).json({message:'User Successfully Deleted',success:true,user});
   
  

  } catch (error) {
 return res.status(500).json({message:'error in Deleting user ',error,success:false})
  }
}
module.exports.getUser=async(req,res)=>{
  try {
    const id=req.params.id;
const user=await User.findById(id);
if(!user)return res.status(400).json({message:'User Not Found ',success:false});
return res.status(200).json({message:'User Successfully Find',success:true,user});
   
  

  } catch (error) {
 return res.status(500).json({message:'error in Deleting user ',error,success:false})
  }
}
