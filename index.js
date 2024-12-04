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

app.get('/test' ,async(req,res)=>{
    const allUrls = await db.URL.find({});
    return res.end( `
    <ul>
        ${allUrls.map(url => `<li> ${url.shortId}, ${url.redirectURL} - ${url.visitHistory.length}</li>`).join("")}
    </ul>
    `)
    // return res.end(html)
})

app.listen(PORT,()=> console.log(`listen port at http://localhost:${PORT}`));