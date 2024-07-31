import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config({ path: './.env' });

const app = express();

// Middleware setup
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Route for checking
app.get('/', (req, res) => {
    res.send('Hello from Express backend! this backend has been deloyed');
});

// Importing routers
import { userRouter } from './Routes/user.routes.js';
import { taskRouter } from './Routes/task.routes.js';
import { adminRouter } from './Routes/admin.routes.js';

// Using routers
app.use('/api/v1/user', userRouter);
app.use('/api/v1/task', taskRouter);
app.use('/api/v1/admin', adminRouter);

export default app;
