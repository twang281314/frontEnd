var rf = require('fs');
var jwt = require('jsonwebtoken');
var captchapng = require('captchapng');
var Tokens = require('../middleware/token')
var t = new Tokens;
class Login {
    constructor(){}
    captcha(req, res, next) {
        var str = parseInt(Math.random()*9000+1000);   //随机生成数字
        req.session.captcha = str;   // 存入session
        var p = new captchapng(80, 30, str);  //生成图片
        p.color(0, 0, 0, 0);
        p.color(80, 80, 80, 255);
        var img = p.getBase64();
        var imgbase64 = new Buffer(img, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
    }
    login(req, res, next) {
        let captcha = req.body.captcha;
        let userName = req.body.userName;
        let password = req.body.password;
        if (captcha != req.session.captcha) {
            res.status(400).send({
                message: '验证码错误'
            });
        }else if(userName == "anytao" && password == "123321"){
            // 设置token
            var datas = {userName:"anytao"}
            var token = t.setToken('cxh',300,datas)
            res.json({"code":100,"verson":true,"msg":"登陆成功","token":token});
        }else{
            res.json({"code":0,"verson":false,"msg":"密码错误"});
        }
    }
}
module.exports = Login
