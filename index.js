import express from "express";
import cookieParser from 'cookie-parser';
import routes from './routes/url.js';
import staticRoute from './routes/staticRouter.js';
import userRoute from './routes/user.js';
import middelware from './middlewares/auth.js'
import connection from './connection.js';


const app = express();
const PORT = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(middelware.checkForAuthentication)

app.set('view engine', 'ejs');
// app.set('views',path.resolve('./views'))

connection('mongodb://127.0.0.1:27017/shortUrl').then(()=> console.log("connection successfully"));

app.use('/url',middelware.restrictTo(["NORMAL","ADMIN"]),routes)

app.use('/user',userRoute);

app.use('/',staticRoute)

app.listen(PORT,()=> console.log(`listen port at http://localhost:${PORT}`));