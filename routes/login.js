var express=require('express');
var router=express.Router();
var captcha=require('../lib/captcha.js');
var md5=require('../lib/md5.js');
var dbController=require('../model/dbController.js');
var async=require('async');
var fs=require('fs');
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
	//console.log(req.body.name,req.body.password);
	if(req.body.captcha==code){
		async.waterfall([function (callback) {
			var password=md5.md5(req.body.password);
			var name=req.body.name.replace(/[\'\"\\\/\b\f\n\r\t]/g, '').replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/,'');
			dbController.checkUser(name,password,function (result) {
				callback(null,result);
			});
		}],function (err,result) {
			console.log(code);
			console.log(result);
			if(result.length!=0){
				if(result[0]['role']=="superAdmin"){
					req.session.role=result[0]['role'];
					req.session.user=req.body.name;
					res.send('1');
				}

		    }
		    else{
		    	res.send('-1');
		    }
			
			
		});
		
	}
	else{
		res.send('2');
	}
	
})


module.exports=router;