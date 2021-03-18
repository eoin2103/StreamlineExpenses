const jwt = require('jsonwebtoken');

function verifyAuth(req,res,next){
    const token = req.header('auth-jwt');
    if(!token) return res.status(400).send('Access Denied User not logged in');

    try{
        const verify = jwt.verify(token, process.env.JTOKEN_SECRET);
        req.user = verify;
    }catch(err){
        res.status(400).send('Error Invalid Token!!');
    }
}