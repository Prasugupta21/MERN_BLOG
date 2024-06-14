const {Router}=require("express");

const router=Router();
const {Signup,Login,Logout} =require( '../controllers/user');
const {userVerification} =require('../middleware/user')
// router.post('/',userVerification)
router.post("/signup",Signup);
router.post("/login",Login);
router.get('/',(req,res)=>{
    res.send('Home page')
})
router.get('/login',(req,res)=>{
    res.send('Login')
})
router.get('/signup',(req,res)=>{
    res.send('Signup')
})
router.post("/logout",Logout);
module.exports=router;
