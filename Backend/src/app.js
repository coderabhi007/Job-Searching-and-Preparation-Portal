import Express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app=Express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(Express.json({limit:"16kb"}))
app.use(Express.urlencoded({extended:true,limit:"16kb"}))
app.use(Express.static("public"))
app.use(cookieParser())
import authRouter from './Routes/auth.routes.js'
import otpRouter from './Routes/otp.routes.js'
import companyRouter from './Routes/company.routes.js'
import jobRouter from './Routes/job.routes.js'
import userRouter from './Routes/user.routes.js'
app.use('/api/v1/user',userRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/otp',otpRouter)
app.use('/api/v1/company',companyRouter)
app.use('/api/v1/job',jobRouter)
export default app;