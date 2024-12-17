import db from '../modles/url.js';
import {v4 as uuidv4} from 'uuid';
import serviceAuth from '../service/auth.js'



async function userSignupHandle(req,res){
    const {name,email,password} = req.body;
    const result = await db.USER.create({
        name,
        email,
        password
    });
    res.render('home')
}

async function userLoginHandle(req,res){
    const {email,password} = req.body;
    const user = await db.USER.findOne({
        email,
        password
    });
    if(!user){
        return res.render('login',{
            error : "Invalid Email or Password"
        })
    }
    
    const token = serviceAuth.setUser(user);
    res.cookie('token', token);
    
    return res.redirect("/")
}

export default {
    userSignupHandle,
    userLoginHandle
}