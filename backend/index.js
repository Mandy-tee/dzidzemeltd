import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRouter from './routes/product.js';

// Connect to database
await mongoose.connect(process.env.MONGO_URI);

// Create express app
const app = express();

// Apply global middlewares
app.use(express.json());
app.use(cors());

// Use routes
app.use(productRouter);

// Listen for incoming request on specified port
app.listen(5000, ()=>{
    console.log('App is listening on port 5000')
});