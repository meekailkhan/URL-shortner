import express from "express";
import routes from './routes/url.js'
import connection from './connection.js';
import db from './modles/url.js'

const app = express();
const PORT = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connection('mongodb://127.0.0.1:27017/shortUrl').then(()=> console.log("connection successfully"));

app.use('/url',routes)



app.listen(PORT,()=> console.log(`listen port at http://localhost:${PORT}`));