import ApiError from "../utils/ApiError.js";
import asyncHandller from "../utils/asyncHandller.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyjwt = asyncHandller(async(req,res,next) => {
	try{
		const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","").trim()
    
		if(!token){
       throw new ApiError(401, "Unauthorized request")

		}
		console.log("token===",token);
		const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    console.log("====",decodedToken)
		const user = await User.findById(decodedToken.userid).select("-password -refreshToken")
    console.log(user)
		if(!user){
			throw new ApiError(401 , "Invalid Access Token  !!")
		}
		
		req.user = user
		next();
	}catch(error){
    throw new ApiError(401, error?.message || "Invalid access token")
	}
})