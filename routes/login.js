var express=require('express');
var router=express.Router();
var code=require('../lib/captcha.js');
var fs=require('fs');



router.get('/',function (req,res) {
	var time=new Date().getTime();
	code.codeController(time,function (result) {
		console.log(result);
		res.render('login',{imgtime:time});
	});
	
})

router.post('/reborncode',function (req,res) {
	code.codeController(req.body.time,function (result) {
		res.send(result);
	});
	
	
})


module.exports=router;