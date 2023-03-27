const express=require("express")
const {connection} = require("./db");
const {userRouter}=require('./routers/userRouter')
const {authenticate}=require('./middleware/authentication')
const {postRouter}=require('./routers/postRouter')
require("dotenv").config()
const app=express();

const cors=require("cors")
app.use(cors())
app.use(express.json());

app.use('/users',userRouter);
app.use(authenticate)
app.use('/posts',postRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`server running at ${process.env.port}`)
    }catch(err){
        console.log(err)
    }
})
