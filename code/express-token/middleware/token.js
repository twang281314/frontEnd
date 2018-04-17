var jwt = require('jsonwebtoken');

class Tokens {
    constructor(){}
    testToken(req,res,next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(token) {
            jwt.verify(token, 'cxh' , function(err,decoded) {
                if(err) {
                    return res.json({success:false,msg:'token错误'})
                }else {
                    req.userInfo = decoded;
                    next()
                }
            })
        }else {
            return res.status(403).send({success:false,msg:"没有token"})
        }
    }
    setToken(name,time,data) {
        var jwtSecret = name;
        var token =  jwt.sign(data, jwtSecret, {
            expiresIn: time
        })
        return token;
    }
}
module.exports = Tokens;