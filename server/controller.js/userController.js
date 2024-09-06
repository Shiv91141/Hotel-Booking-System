const express =require(  'express')
const userModel =require( '../models/user')
const { validationResult } =require( 'express-validator')
const bcrypt =require( 'bcrypt')
const jwt =require( 'jsonwebtoken')
const dotenv =require( 'dotenv')
dotenv.config({path:"../config/.env"})

// router.post("/register", async (req, res) => {
//     const newuser = new user(req.body);
//     try {
//       const user = await newuser.save();
//       res.send("user Registered Successfully");
//     } catch (error) {
//       return req.statusCode(400).json({ error });
//     }
//   });
const Register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const{name, email, password} = req.body;
    try{
        const userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(201).json({success:true,exist:true,msg: 'user already existing'});
        }
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = new userModel ({name, email, password: hashPassword})
        const result = await newUser.save()
        result._doc.password = undefined;
        return res.status(201).json({success:true,exist:false, ...result._doc})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: err.message})
    }
};

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await user.findOne({ email: email, password: password });
//       if (user) {
//         const temp = {
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           _id: user._id,
//         };
//         res.send(temp);
//       } else {
//         return res.status(400).json({ message: "login failed" });
//       }
//     } catch (error) {
//       return res.status(400).json({ error });
//     }
//   });
const Login = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const{email, password} = req.body;
    try{
        const userExist = await userModel.findOne({email})
        if(!userExist){
            return res.status(400).json({
                errors: [{msg: "user Not Registered"}],
            });
        }
        const isPasswordOk = await bcrypt.compare(password, userExist.password)
        if(!isPasswordOk){
            return res.status(400).json({
                errors: [{msg: 'Incorrect Password'}],
            });
        }
        const token = jwt.sign({_id: userExist._id}, process.env.JWT_SECRET_KEY, {expiresIn: "3d"})
    
        const user = {...userExist._doc, password: undefined}
        return res.status(201).json({success:true, user, token})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: err.message})
    }
};

const Auth = async (req, res) => {
    return res.status(200).json({
                success: true,
                user: req.user._doc
    });
    
};

const GetAllUsers = async (req,res) => {
    try{
        const users = await userModel.find({})
        return res.status(200).json({success: true, users})
    } catch (err){
        return res.status(500).json({error: err.message})
    }
}
module.exports= {Register, Login, Auth,GetAllUsers};