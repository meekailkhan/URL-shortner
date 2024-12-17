import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const secreteKey = '$#1Loger'


dotenv.config();

function setUser(user){
    console.log("Payload for JWT:", user);
    return jwt.sign({
        _id : user._id,
        email : user.email,
        password : user.password,
        role : user.role
    },secreteKey)
}

function getUser(token){
    try{
        return jwt.verify(token,secreteKey)
    }catch(err){
        return null
    }
}

export default {
    setUser,
    getUser
}