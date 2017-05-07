var mongo=require('mongodb');
var host="localhost";
var port=mongo.Connection.DEFAULT_PORT;
var db=new mongo.Db('brhCms',new mongo.Server(host,port,{auto_reconnect:true}),{safe:true});

var dbController={
	checkUser:function (username,password) {
		db.open(function (err,db) {
			db.collection('brhCms_users',function (err,collection) {
				collection.find({name:username,password:password}).toArray(function (err,docs) {
					if(docs.length!=0)
						return docs;
					else
						return false;
				});
			});
		})
	},

};
exports.dbController=dbController;