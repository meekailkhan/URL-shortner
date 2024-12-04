import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// set pulic directory as a static files
const publicDir = path.join(__dirname,'../public')
router.use(express.static(publicDir))

router.get('/', (req,res)=>{
    return res.render('home')
})

export default router