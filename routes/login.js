var express=require('express');
var router=express.Router();
var ccap=require('ccap');
var fs=require('fs');



router.get('/',function (req,res) {
	var captcha=ccap();
	var txt=captcha.get()[0];
	var buf=captcha.get()[1];
	fs.writeFile('./public/images/imgcode.jpg',buf,function (err) {
		if(err) console.log(err);
	})
	console.log(txt);
	res.render('login');
})


module.exports=router;