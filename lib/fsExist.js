var fs=require('fs');

function check(path) {

		fs.stat(path,function (err,stats) {
		if(stats)
		{
			
			return true;
		}
		else{
			
			return false;
		}
		});
}


exports.check=check;