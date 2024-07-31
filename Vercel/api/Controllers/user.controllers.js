
import {User} from '../Models/user.models.js'
import cookieParser from 'cookie-parser'


const register=async(req,res)=>{
    try{
        const { username, email, password}=req.body;
        console.log(username,email,password)


        if(!(username && email && password)){
            return res
            .status(404)
            .json({message:"All fields are mandatory"})
        }

        const existingUser=await User.find({username})

        console.log(existingUser)

        if(existingUser.length>0){
            return res
            .status(409)
            .json({message:"User already exists"})
        }

        await User.create({username, email, password, role:"user"})
       

        return res
        .status(201)
        .json({message:"User registered successfully"})


    }
    catch(err){
        return res
        .status(500)
        .json({message:"server returned an error",err})
    }
}

const login=async(req,res)=>{
    try{
        const {username, password}=req.body;
        console.log(username,password)

        if(! username || ! password ){
            return res.status(404).json({message:"username and password are necessary"})
        }
        
        const user=await User.findOne({username})
       

        if(!user){
                return res.status(404).json({message:"user is not registered"})
        }
          

       if ( user.password!==password){
        return res
        .status(402)
        .json({message:"password is not correct"})

       }
        const role = user.role
      const AccessToken=await user.generateAccessToken()
      console.log(AccessToken);

       return res
       .status(200)
      //.cookie("AccessToken",AccessToken)
       .json({message:"login successful",AccessToken,role})

        

    }
    catch(err){
        return res.status(500).json({message:"server returned an error"})
    }
}


const logout=(req,res)=>{
    try{
        const userId=req._id

        console.log(userId)

        if(!userId) return res.json({message:"user is invalid"})

        return res
        .status(200)
        .json({message:"user logged out sucessfully"})    

    }
    catch(err){
        return res.json({message:"server returned an error"})
    }
}



export {register,login,logout}