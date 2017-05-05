var express=require('express');
var router=express.Router();
var code=require('../lib/captcha.js');
var fs=require('fs');



router.get('/',function (req,res) {
	var txt=code.codeController(4);
	console.log(txt);
	res.render('login');
})

router.get('/reborncode',function (req,res) {
	
})


module.exports=router;