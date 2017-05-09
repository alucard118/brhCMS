var captchapng=require('captchapng');
var fs=require('fs');
var fsexists=require('../lib/fsExist.js');

if(fsexists.check('./public/images/captcha')===false){
	fs.mkdir('./public/images/captcha',function (err) {
		if(err) throw err;
	});
}

var codeController=function (time,callback) {
	var code='0123456789';
	var randomcode='';
	for(var i=0;i<4;i++){
		randomcode+=code[Math.floor(Math.random()*code.length)];
	}
	var p=new captchapng(80,28,randomcode);
	p.color(255,255,255,0);
	p.color(80,80,80,255);
	var img=p.getBase64();
	var imgbase64=new Buffer(img,'base64');
	fs.writeFile('./public/images/captcha/code'+time+'.png',imgbase64,function (err) {
		if(err) console.log(err);
	})
	 callback(randomcode);
}

new	Promise(function (resolve,reject) {
	fs.readdir('./public/images/captcha',function (err,files) {
		if(err) throw err;
		else resolve(files);
	})
}).then(function (result) {
	//console.log(result);
	for(var i=0;i<result.length;i++){
		fs.stat('./public/images/captcha/'+result[i],function (err,stats) {
			//console.log(stats);
		})
	}
}).catch(function (reason) {
	console.log(reason);
})

exports.codeController=codeController;