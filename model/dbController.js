var mongo=require('mongodb').MongoClient;
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://brhcms:ccfinfo2@localhost:27017/brhCms";
var ObjectId=require('mongodb').ObjectID;


var dbController={
	checkUser:function (username,password,callback) {
		MongoClient.connect(url,{auto_reconnect:true},function (err,db) {
			db.collection('brhCms_users',function (err,collection) {

				collection.find({'name':username,'password':password}).toArray(function (err,docs) {
					
						//console.log(docs);
						callback(docs);
					
				
				});
			});
			db.close();
		})
	},
	saveNews:function (title,topic,topEndTime,content,published,saveTime,imgPath,callback) {
		MongoClient.connect(url,function (err,db) {
			db.collection('brhCms_newsList',function (err,collection) {
				collection.insert({'title':title,'topic':topic,'topEndTime':topEndTime,'content':content,'published':published,'saveTime':saveTime,'img':imgPath},function (err,docs) {
					if(err) console.log(err);
					else{
						callback(docs);
					}
				})
			})
			db.close();
		})
	},
	showNews:function (id,callback) {
		MongoClient.connect(url,function (err,db) {
			db.collection('brhCms_newsList',function (err,collection) {
				if(id!=undefined){
					collection.find({'_id':ObjectId(id)}).toArray(function (err,docs) {
					callback(docs);
					})
				}
				else{
					collection.find().sort({'saveTime':-1}).toArray(function (err,docs) {
					callback(docs);
					})
				}
			})
			db.close();
		})
	},
	updateNews:function (id,title,topic,topEndTime,content,published,saveTime,imgPath,callback) {
		MongoClient.connect(url,function (err,db) {
			db.collection('brhCms_newsList',function (err,collection) {
				collection.update({'_id':ObjectId(id)},{'title':title,'topic':topic,'topEndTime':topEndTime,'content':content,'published':published,'saveTime':saveTime,'img':imgPath},function (err,docs) {
					if(err) console.log(err);
					else{
						callback(docs);
					}
				})
			})
			db.close();
		})
	}

};
module.exports=dbController;