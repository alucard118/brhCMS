var fs=require('fs');


function check(path,callback) {
	fs.stat(path,function (err,stats) {
		if(stats){
			if(callback) callback('true')
		}
		else{
			if(callback) callback('false');
		}
	});
}


exports.check=check;