import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import cors from "cors";
import helmet from 'helmet';
import { Route as AuthRoute } from './routes/auth.js';
import { Route as TasksRoute } from "./routes/tasks.js";
import { limiter } from './middlewares/limiter.js';


const app = express();

configDotenv();

//middlewares for both dev and production
app.use(cors('*'));
app.use(express.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(limiter);
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'trusted-scripts.com'],
            styleSrc: ['style-src'],
        },
    },
}))
app.set('trust proxy',1)

//App Routes
app.use('/api/auth', AuthRoute);
app.use('/api/tasks', TasksRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

