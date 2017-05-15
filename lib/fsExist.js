var fs=require('fs');

function check(path,callback) {
		fs.stat(path,function (err,stats) {
		if(stats)
		{
			callback(true)
			
		}
		else{
		
			callback(false);
		}
		});
}


exports.check=check;