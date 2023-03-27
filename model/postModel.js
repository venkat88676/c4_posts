
const mongoose=require("mongoose")
const noteSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_comments:Number,
    userID:String
},{
    versionKey:false
})

const PostModel=mongoose.model("posts",noteSchema)

module.exports={PostModel}