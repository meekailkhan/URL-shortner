import express from 'express';
import path from 'path'
import middleware from '../middlewares/auth.js'
import db from '../modles/url.js'
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// set pulic directory as a static files
const publicDir = path.join(__dirname,'../public')
router.use(express.static(publicDir))

// router.set('view engine', 'ejs');

router.get('/', middleware.restrictTo(["NORMAL","ADMIN"]), async (req,res)=>{
    const allUrls = await db.URL.find({createdBy : req.user._id}); 
    return res.render('home',{
        urls : allUrls
    })
})

router.get("/admin/urls",middleware.restrictTo(["ADMIN"]),async (req,res)=>{
    const allUrls = await db.URL.find(); 
    return res.render('home',{
        urls : allUrls
    })
})

router.get("/signup",(req,res)=>{
    return res.render('signup')
})

router.get('/login',(req,res)=>{
    return res.render('login')
})

export default router    