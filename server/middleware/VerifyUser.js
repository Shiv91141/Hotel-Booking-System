const jwt =require ("jsonwebtoken");
const userModel=require ("../models/user");
const { json } =require ("express");
require("dotenv").config();

const VerifyUser = (req,res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            try{
            if(err){
                return res.status(401).json({error: "Unauthorized"})
            }
            const user = await userModel.findOne({_id: payload._id}).select("name")
            req.user = user;
            next();
        } catch (err){
            return res.status(500).json({error: err.message});
        }
        })
    } else{
        return res.status(403).json({error: "Forbidden"})
    }
}
module.exports={VerifyUser}; 