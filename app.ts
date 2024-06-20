import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();



const app = express();
app.use(cors({
    credentials: true,
    origin: app.get('env') === 'production' ? 'https://tutorialx-a759317e325f.herokuapp.com' : 'http://localhost:3333'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// use static file
const uploadsDirectory = path.join(__dirname, 'src', 'uploads');
app.use('/uploads', express.static(uploadsDirectory));


//Session settings from express session
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from './src/routes/user.routes';
import tutorialRouter from './src/routes/tutorials.routes';
import chapterRouter from './src/routes/chapter.routes';

app.set('trust proxy', 1);
app.use(session({
    secret: 'secret quick for now',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: app.get('env') === 'production',
        secure: app.get('env') === 'production',
        sameSite: app.get('env') === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000  // Valid pentru o zi
    },

    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60, // = 14 days. Default
        autoRemove: 'native' // Default
    })
}))











app.get('/', (req, res) => res.send('Hello World!'));


app.use('/users', userRouter);
app.use('/tutorial', tutorialRouter);
app.use('/chapter', chapterRouter);



export default app;

