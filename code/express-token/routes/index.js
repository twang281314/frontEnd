var express = require('express');
var router = express.Router();
var rf = require('fs');
var Login = require('../controller/login');
var Tokens = require('../middleware/token')
var t = new Tokens;
var login = new Login;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("index")
});
router.post('/upLoadImg',function(req,res,next){
    let imgData = req.body.imgData;
    console.log(imgData)
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, 'base64');
    let timer = Number( new Date() );
    console.log(timer)
    rf.writeFile("views/images/artCover"+timer+".png",dataBuffer, function(err) {
        if(err) {
          res.json({"code":400,"verson":false,"msg":err});
        }else {
          res.json({"code":100,"verson":true,"url":"views/src/common/images/artCover/"+timer+".png"});
        }
    });
})
router.get('/captcha', login.captcha);
router.post('/login',login.login);
router.post('/list',t.testToken,function(req, res, next){
    // 先解析token 
    console.log(req.userInfo)
    res.json({
        username : req.userInfo.userName,
        success : true,
        result : [
            {
                name:'1111111'
            },
            {
                name :'22222'
            }
        ]
    })
})
module.exports = router;