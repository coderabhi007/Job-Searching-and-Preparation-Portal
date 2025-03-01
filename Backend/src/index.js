import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})
import app from './app.js';
import connectDB from './DB/index.js';
connectDB().then(()=>
    app.listen(process.env.PORT, (req,res) => {
        console.log(`server is running`)
    })
).catch((error)=>{
    console.log("Index file error"+error)
})