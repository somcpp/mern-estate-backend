import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'

dotenv.config()
const app = express();

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.use(express.json());

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected to database');
})
.catch((err) => {
    console.log(err)
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})

app.get('/test', (req,res) => {
    res.send("Hello World")
})

app.use('/api/auth',authRouter);