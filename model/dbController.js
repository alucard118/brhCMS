var mongo=require('mongodb').MongoClient;
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://brhcms:ccfinfo2@localhost:27017/brhCms";


var dbController={
	checkUser:function (username,password,callback) {
		MongoClient.connect(url,function (err,db) {
			db.collection('brhCms_users',function (err,collection) {

				collection.find({'name':username,'password':password}).toArray(function (err,docs) {
					
						//console.log(docs);
						callback(docs);
					
				
				});
			});
		})
	},

};
module.exports=dbController;