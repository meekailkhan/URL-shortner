import express from 'express';
import controll from '../controller/url.js'
import path from 'path'
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// set pulic directory as a static files
const publicDir = path.join(__dirname,'../public')
router.use(express.static(publicDir))


router.post('/',controll.shortUrl)

router.get('/:shortID',controll.redirectHandler);

router.get('/analystic/:shortID',controll.analysticHandler)

export default router