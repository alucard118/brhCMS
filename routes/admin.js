var express=require('express');
var router=express.Router();
var fs=require('fs');
var multiparty=require('multiparty');
var fsExists=require('../lib/fsExist.js');
var dbController=require('../model/dbController.js');
var async=require('async');

var stats=fsExists.check('./public/images/');
console.log('stats'+stats);

router.get('/',function (req,res) {
	if(req.session.role=='superAdmin'){
		
		if(fsExists.check('./public/images/'+req.session.user)===false){
			console.log('dir not exist');
			fs.mkdir('./public/images/'+req.session.user,function (err) {
				if(err) console.log('checkDirError'+err);
				else console.log('dir done');
			});
		}
		res.redirect('/admin/home');

	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.redirect('/noprevelige');
	}
	
})
router.post('/fileUpload',function (req,res) {
	if(req.session.role=='superAdmin'){
			var form=new multiparty.Form({uploadDir:'./public/images/'+req.session.user});
			form.parse(req,function (err,fields,files) {
			var fileTmp=JSON.stringify(files,null,2);
			console.log(form);
			if(err) console.log('fileUploadError:'+err);
		})
		
	}
	else{
		res.redirect('/noprevelige');
	}
})

router.get('/home',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_home',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.redirect('/noprevelige');
	}
	
});
router.get('/news',function (req,res) {
	if(req.session.role=='superAdmin'){
		dbController.showNews(null,function (result) {
			res.render('./admin/admin_news',{user:req.session.user,newsList:result});
		})
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.redirect('/noprevelige');
	}
	
});
router.post('/news',function (req,res) {
	if(req.session.role=='superAdmin'){
		var date=new Date();
		date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
		if(req.body.id==''){
			dbController.saveNews(req.body.newsTitle,req.body.newsTopic,req.body.topEndTime,req.body.newsContent,req.body.published,date,function (result) {
				if(result){
					res.send(result['ops'][0]['_id']);

				}
				else
					res.send('0');
			});
		}
		else{
			dbController.updateNews(req.body.id,req.body.newsTitle,req.body.newsTopic,req.body.topEndTime,req.body.newsContent,req.body.published,date,function (result) {
				if(result){
					res.send(req.body.id);
					console.log('已更新新闻');
				}
				else
					res.send('0');
			})
		}
		
	}
	else{
		res.redirect('/noprevelige');
	}
});
router.get('/createNews',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_createNews',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.redirect('/noprevelige');
	}
	
});

router.get('/updateNews/:id',function (req,res) {
	if(req.session.role=='superAdmin'){
		id=req.params.id.replace(':','');
		dbController.showNews(id,function (result) {
			res.render('./admin/admin_updateNews',{user:req.session.user,newsContent:result});
		})
		
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.redirect('/noprevelige');
	}
	
});
router.get('/date',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_date',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.redirect('/noprevelige');
	}
	
});
router.get('/speaker',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_speaker',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.redirect('/noprevelige');
	}
	
});
router.get('/sponsor',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_sponsor',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.redirect('/noprevelige');
	}
	
});

router.get('/logout',function (req,res) {
	req.session.destroy(function (err) {
		res.redirect('/login');
	})
	
})


module.exports=router;