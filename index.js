import express from "express";
import routes from './routes/url.js'
import staticRoute from './routes/staticRouter.js'
import connection from './connection.js';
import path from 'path'

const app = express();
const PORT = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'))

connection('mongodb://127.0.0.1:27017/shortUrl').then(()=> console.log("connection successfully"));

app.use('/url',routes)

app.use('/',staticRoute)



app.listen(PORT,()=> console.log(`listen port at http://localhost:${PORT}`));