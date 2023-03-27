const express=require("express")
const {PostModel}=require('../model/postModel')
const postRouter=express.Router()
const jwt=require("jsonwebtoken")

postRouter.get('/',async(req,res)=>{
    const {min,max,page}=req.query
    const token=req.headers.authorization
    jwt.verify(token,'masai',async(err,decoded)=>{
        if(decoded){
            skip=(+page-1)*3
            let id=decoded.userId
            let posts= await PostModel.find({userID:id}).skip(skip).limit(3)
            res.send(posts)
        }
        else{
            res.status(400).send({"msg":"Please Login"})
        }
    })
    
})
postRouter.get('/top/:page',async(req,res)=>{
    let page=req.params
    const token=req.headers.authorization
    jwt.verify(token,'masai',async(err,decoded)=>{
        if(decoded){
            let id=decoded.userId
            let skip=(+page-1)*3
            let posts= await PostModel.find({userID:id}).sort({no_of_comments:-1}).skip(skip).limit(3)
            res.send(posts)
        }
        else{
            res.status(400).send({"msg":"Please Login"})
        }
    })
    
})

postRouter.post('/add',async(req,res)=>{
    try{
        const payload=req.body
        const post=new PostModel(payload)
        await post.save()
         res.status(200).send({"msg":"New Post Added"}) 
    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
    
})

postRouter.patch('/update/:id',async(req,res)=>{
    const postId=req.params.id
    const payload=req.body;
    try{
        await PostModel.findByIdAndUpdate({_id:postId},payload)
         res.status(200).send({"msg":`Note with id:${postId} has updated`})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
    
})

postRouter.delete('/delete/:id',async(req,res)=>{
    const postId=req.params.id
    try{
        await PostModel.findByIdAndDelete({_id:postId})
        res.send({"msg":`Note with id:${postId} has Deleted`})
    }
    catch(err){
        res.send(err)
    }
    
})

module.exports={postRouter}