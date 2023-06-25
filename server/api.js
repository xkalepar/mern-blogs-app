import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db/connect.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import multer from 'multer';

import userAuthentication from './routes/blogs.js';
import profileRouter from './routes/profile.js';
import logoutRouter from './routes/logout.js';
import postMiddlewareAuth from './middleware/authentication.js';
import postRouter from './routes/post.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

app.use(express.static('public'));

const uploadMiddleware = multer({ dest: 'uploads/' });

// routers
app.use('/api/v1', userAuthentication, profileRouter);
app.use('/api/v1', logoutRouter);

// post routers
const dirname = path.dirname(new URL(import.meta.url).pathname);
app.use('/uploads', express.static('uploads'));
app.use(uploadMiddleware.single('file'));
app.use('/api/v1', postMiddlewareAuth, postRouter);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();