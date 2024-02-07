import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import cors from "cors";
import helmet from 'helmet';
import ejs from 'ejs';
import expressEjsExtends from 'express-ejs-extend';
import path from 'path';
import { limiter } from './middlewares/limiter.js';
import { Route as AuthRoute } from './routes/auth.js';
import { Route as TasksRoute } from "./routes/tasks.js";




const app = express();

configDotenv();

//middlewares for both dev and production
app.use(cors('*'));
app.use(express.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(limiter);
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
            imgSrc: ["'self'", "https://firebasestorage.googleapis.com"]
        },
    },
}))
app.set('trust proxy',1);



//App Routes
app.use('/api/auth', AuthRoute);
app.use('/api/tasks', TasksRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

