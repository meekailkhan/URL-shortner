import jwt from 'jsonwebtoken';
import serviceAuth from '../service/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRETE || "$#1Loger";


function checkForAuthentication(req,res,next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if(!tokenCookie){
        return next();
    }

    const token = tokenCookie;
    const user = serviceAuth.getUser(token);

    req.user = user;
    return next()
}

function restrictTo(roles){
    return function(req,res,next){
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.role)) return res.end("you're unauthorized");

        next()
    }
}



export default {
    checkForAuthentication,
    restrictTo
}