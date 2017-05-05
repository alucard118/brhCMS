var captchapng=require('captchapng');
var fs=require('fs');
var codeController=function (length) {
	var code='0123456789';
	var randomcode='';
	for(var i=0;i<length;i++){
		randomcode+=code[Math.floor(Math.random()*code.length)];
	}
	var p=new captchapng(80,28,parseInt(randomcode));
	p.color(255,255,255,0);
	p.color(80,80,80,255);
	var img=p.getBase64();
	var imgbase64=new Buffer(img,'base64');
	fs.writeFile('./public/images/code.png',imgbase64,function (err) {
		if(err) console.log(err);
	})
	return randomcode;
}

exports.codeController=codeController;