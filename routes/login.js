var express=require('express');
var router=express.Router();
var captcha=require('../lib/captcha.js');
var fs=require('fs');
var code='';



router.get('/',function (req,res) {
	var time=new Date().getTime();
	captcha.codeController(time,function (result) {
		code=result;
		res.render('login',{imgtime:time});
	});
	
})

router.post('/reborncode',function (req,res) {
	captcha.codeController(req.body.time,function (result) {
		code=result;
		res.send(result);
	});
	
	
})

router.post('/',function (req,res) {
	console.log(code);
	console.log(req.body.name,req.body.password,req.body.captcha);
})


module.exports=router;