var express=require('express');
var router=express.Router();
var captcha=require('../lib/captcha.js');
var dbController=require('../model/dbController.js');
var async=require('async');
var fs=require('fs');
var session=require('express-session');
var code=' ';



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
	if(req.body.captcha==code){
		async.waterfall([function (callback) {
			var result=dbController.checkUser(req.body.name,req.body.password);
			callback(null,result);
		}],function (err,result) {
			if(result){
				console.log(result);
				res.send('1');
			}
			else{
				res.send('0');
			}
		})
		
	}
	else{
		res.send('2');
	}
	
})


module.exports=router;