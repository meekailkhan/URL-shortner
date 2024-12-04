import express from 'express';
import controll from '../controller/url.js'


const router = express.Router();

router.post('/',controll.shortUrl)

router.get('/:shortID',controll.redirectHandler);

router.get('/analystic/:shortID',controll.analysticHandler)

export default router