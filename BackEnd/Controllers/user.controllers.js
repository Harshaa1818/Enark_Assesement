
import User from '../Models/user.models.js'


const register=async(req,res)=>{
    try{
        const {username, password,role}=req.body;

        if(! username || ! password || !role){
            return res
            .status(404)
            .json({message:"username, password and role is necessary"})
        }

        await User.create({username, password, role})
        User.save();

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

        if(! username || ! password ){
            return res.status(404).json({message:"username and password are necessary"})
        }

        const user=await User.find({username})

        if(!user){
                return res.status(404).json({message:"user is not registered"})
        }
          
        
       if (! user.password===password){
        return res
        .status(402)
        .json({message:"password is not correct"})

       }

       const AccessToken=await user.generateAccessToken();

       return res
       .status(200)
       .cookies("AccessToken",AccessToken)
       .json({message:"login successful"})

        

    }
    catch(err){
        return res.status(500).json({message:"server returned an error"})
    }
}


const logout=(req,res)=>{
    try{
        const userId=req._id

        if(!userId) return res.json({message:"user is invalid"})

        return res
        .status(200)
        .clearcookies()
        .json({message:"user logged out sucessfully"})    



    }
    catch(err){
        return res.json({message:"server returned an error"})
    }
}



export {register,login,logout}