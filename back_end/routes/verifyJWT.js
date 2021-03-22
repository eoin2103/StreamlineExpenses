const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('auth-jwt');
    if(!token) return res.status(400).send('Access Denied User not logged in');

    try{
        const verify = jwt.verify(token, process.env.JTOKEN_SECRET);
        req.user = verify;
        next();
    }catch(err){
        res.status(400).send('Error Invalid Token!!');
    }
}