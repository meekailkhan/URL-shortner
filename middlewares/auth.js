import serviceAuth from '../service/auth.js';


async function restrictToLoggedInUserOnly(req,res,next){
    const userUid = req.cookies?.uid;
    if(!userUid) return res.redirect('/login');
    const user = serviceAuth.getUser(userUid);
    console.log(user)
    console.log(userUid)

    if(!user) return res.redirect('/login');
    req.body.user = user;
    next();
}   

async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;

    const user = serviceAuth.getUser(userUid);
    
    req.body.user = user;
    next();
}

export default {
    restrictToLoggedInUserOnly,
    checkAuth
}