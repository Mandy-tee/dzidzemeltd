import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRouter from './routes/product.js';
import userRouter from './routes/user.js';
import categoryRouter from './routes/category.js';
import orderRouter from './routes/order.js';
import logRouter from './routes/log.js';

// Connect to database
await mongoose.connect(process.env.MONGO_URI);

// Create express app
const app = express();

// Apply global middlewares
app.use(express.json());
app.use(cors({
    exposedHeaders: ['X-Total-Count'],
}));

// Use routes
app.use(productRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(orderRouter);
app.use(logRouter);

// Listen for incoming request on specified port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});