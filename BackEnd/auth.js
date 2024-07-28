import jwt from 'jsonwebtoken'


const verifyJwt=(req,res,next)=>{
    const token=req.headers['authorization']?.replace('Bearer ','')
    

    if(!token){
        return res.json({message:"empty token"})
    }
    const decodedToken= jwt.verify(token,process.env.SECRET_KEY)
    
    console.log(decodedToken)

    if(!decodedToken){
        return res.json({message:"invalid token"})
    }
    
    const userId=decodedToken._id
    
req._id=userId
   next();

    



}

export {verifyJwt}