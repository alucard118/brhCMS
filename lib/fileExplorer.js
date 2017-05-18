var fs=require('fs');


var fileEx=function (user,path,callback) {
	fs.readdir('./public/upload/info2',function (err,stats) {
		if(stats.length!=0){
			for(var i=0;i<stats.length;i++){
				if(fs.statSync('./public/upload/info2/'+stats[i]).isFile()){
					console.log(stats[i]+' is file');
				}
			}
		}
	})
}

exports.fileEx=fileEx;