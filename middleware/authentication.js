const jwt =require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,'masai',(err,decoded)=>{
            if(decoded){
                req.body.userID=decoded.userId
                next()
            }
            else{
                res.status(400).send({"msg":"Please Login"})
            }
        })
    }else{
        res.status(400).send({"msg":"Please Login"})
    }
}

module.exports={authenticate}