var express=require('express');
var router=express.Router();
var fs=require('fs');
var multiparty=require('multiparty');
var fsExists=require('../lib/fsExist.js');
var dbController=require('../model/dbController.js');
var util=require('util');
var fileEx=require('../lib/fileExplorer.js')

fileEx.fileEx();

//创建指定目录
router.get('/',function (req,res) {
	if(req.session.role=='superAdmin'){
		fsExists.check('./public/upload/'+req.session.user,function (result) {
			if (result=='false') {
				fs.mkdir('./public/upload/'+req.session.user,function (err) {
					console.log('dir not exist');
					if(err) console.log('checkDirError'+err);
					fs.mkdir('./public/upload/'+req.session.user+'/news',function (err) {
						if(err) console.log(err);
					})
			});
			}
		})
		
		res.redirect('/admin/home');

	}
	else {
		res.redirect('/noprevelige');
	}
	
})

//ckeditor 资源管理
router.get('/updateNews/public/upload',function (req,res) {
	if(req.session.role=='superAdmin'){
		var reParam = new RegExp( '(?:[\?&]|&)' + 'CKEditorFuncNum' + '=([^&]+)', 'i' );
		var funcNum=req.url.match(reParam);
		funcNum=(funcNum&&funcNum.length>1)?funcNum[1]:null;

		 var fileUrl ='http://'+ req.rawHeaders[1]+'/images/upload/'+req.session.user;
		 res.render('./admin/fileList',{user:req.session.user});
		 //res.send("<script>window.opener.CKEDITOR.tools.callFunction( "+funcNum+", '"+fileUrl+" ');window.close();</script>")
	}
	else{
		res.redirect('/noprevelige');
	}
})

router.get('/public/upload',function (req,res) {
	if(req.session.role=='superAdmin'){
		var reParam = new RegExp( '(?:[\?&]|&)' + 'CKEditorFuncNum' + '=([^&]+)', 'i' );
		var funcNum=req.url.match(reParam);
		funcNum=(funcNum&&funcNum.length>1)?funcNum[1]:null;

		 var fileUrl ='http://'+ req.rawHeaders[1]+'/images/upload/'+req.session.user;
		 res.render('./admin/fileList',{user:req.session.user});
		 //res.send("<script>window.opener.CKEDITOR.tools.callFunction( "+funcNum+", '"+fileUrl+" ');window.close();</script>")
	}
	else{
		res.redirect('/noprevelige');
	}
})

//ckeditor 上传
router.post('/fileUpload',function (req,res) {
	if(req.session.role=='superAdmin'){
			var form=new multiparty.Form({uploadDir:'./public/upload/'+req.session.user});
			form.parse(req,function (err,fields,files) {
			//var fileTmp=JSON.stringify(files,null,2);
			var fileName=files['upload'][0]['path'].split('/');
			var fileOriginalName=files['upload'][0]['originalFilename'].split('.')[0]+'_'+new Date().getTime()+'.'+files['upload'][0]['originalFilename'].split('.')[1];
			
			//获取ckeditor实例post的CKEditorFuncNum参数
			var reParam = new RegExp( '(?:[\?&]|&)' + 'CKEditorFuncNum' + '=([^&]+)', 'i' );
			var funcNum=req.url.match(reParam);
			funcNum=(funcNum&&funcNum.length>1)?funcNum[1]:null;

			//生成回传的文件链接
			var fileUrl='http://'+req.rawHeaders[1]+'/upload/'+req.session.user+'/'+fileOriginalName;
			//console.log(fileUrl);
			if(err) console.log('fileUploadError:'+err);
			util.inspect({fields: fields, files: files});
			fs.renameSync('./public/upload/'+req.session.user+"/"+fileName[fileName.length-1],'./public/upload/'+req.session.user+"/"+fileOriginalName);
			res.send("<script>window.parent.CKEDITOR.tools.callFunction( "+funcNum+", '"+fileUrl+" ');window.close();</script>")
			
		})
		
	}
	else{
		res.redirect('/noprevelige');
	}
})
// router.get('/fileUpload',function (req,res) {
// 				res.send("<script type='text/javascript'>window.open.CKEDITOR.tools.callFunction(1,"+path+")"+"</script>")
// 			});

router.get('/home',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_home',{user:req.session.user});
	}
	else{
		res.redirect('/noprevelige');
	}
	
});

//新闻管理列表页
router.get('/news',function (req,res) {
	if(req.session.role=='superAdmin'){
		dbController.showNews(null,function (result) {
			res.render('./admin/admin_news',{user:req.session.user,newsList:result});
		})
	}
	else {
		res.redirect('/noprevelige');
	}
	
});

//publish News
router.get('/news/published/:id',function (req,res) {
	if(req.session.role=='superAdmin'){
		var id=req.params.id.replace(':','');
		if(id!=''){
			var publishTime=new Date();
			publishTime=publishTime.getFullYear()+'-'+(publishTime.getMonth()+1)+'-'+publishTime.getDate()+' '+publishTime.getHours()+':'+publishTime.getMinutes();
			dbController.publishNews(id,publishTime,function (result) {
				res.redirect('/admin/news');
			})
		}
	}
	else{
		res.redirect('/noprevelige');
	}
})

//unpublish News
router.get('/news/unpublished/:id',function (req,res) {
	if(req.session.role=='superAdmin'){
		var id=req.params.id.replace(':','');
		if(id!=''){
			dbController.unpublishNews(id,function (result) {
				res.redirect('/admin/news');
			})
		}
	}
	else{
		res.redirect('/noprevelige');
	}
})

//delete News
router.get('/news/delete/:id',function (req,res) {
	if(req.session.role=='superAdmin'){
		var id=req.params.id.replace(':','');
		if(id!=''){
			dbController.deleteNews(id,function (result) {
				res.redirect('/admin/news');
			})
		}
	}
})

//编辑新闻上传图片封面
router.post('/newsImg',function (req,res) {
		var form=new multiparty.Form({uploadDir:'./public/upload/'+req.session.user+'/news'});

		form.parse(req,function (err,fields,files) {
			var fileName=files['upload'][0]['path'].split('/');
			var fileOriginalName=files['upload'][0]['originalFilename'].split('.')[0]+'_'+new Date().getTime()+'.'+files['upload'][0]['originalFilename'].split('.')[1];
			if(err) console.log('fileUploadError:'+err);
			util.inspect({fields: fields, files: files});
			fs.renameSync('./public/upload/'+req.session.user+"/news/"+fileName[fileName.length-1],'./public/upload/'+req.session.user+"/news/"+fileOriginalName);
			res.send('/upload/'+req.session.user+"/news/"+fileOriginalName);
		});
})

//保存新闻
router.post('/news',function (req,res) {
	if(req.session.role=='superAdmin'){
		var date=new Date();
		date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
		if(req.body.img!='')
			var imgPath='/upload/'+req.session.user+req.body.img;
		else
			var imgPath='/images/newsDefaultImg.jpg';
		if(req.body.id==''){
			dbController.saveNews(req.body.newsTitle,req.body.newsTopic,req.body.topEndTime,req.body.newsContent,req.body.published,date,imgPath,function (result) {
				if(result){
					res.send(result['ops'][0]['_id']);

				}
				else
					res.send('0');
			});
		}
		else{
			dbController.updateNews(req.body.id,req.body.newsTitle,req.body.newsTopic,req.body.topEndTime,req.body.newsContent,req.body.published,date,imgPath,function (result) {
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

//新建新闻页
router.get('/createNews',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_createNews',{user:req.session.user});
	}
	else{
		res.redirect('/noprevelige');
	}
	
});

//修改新闻页
router.get('/updateNews/:id',function (req,res) {
	if(req.session.role=='superAdmin'){
		id=req.params.id.replace(':','');
		dbController.showNews(id,function (result) {
			res.render('./admin/admin_updateNews',{user:req.session.user,newsContent:result});
		})
		
	}
	else{
		res.redirect('/noprevelige');
	}
	
});

//发布新闻
router.get('/published/:id',function () {
	
})

//日程管理
router.get('/date',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_date',{user:req.session.user});
	}
	else{
		res.redirect('/noprevelige');
	}
	
});
router.get('/speaker',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_speaker',{user:req.session.user});
	}
	else{
		res.redirect('/noprevelige');
	}
	
});
router.get('/sponsor',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_sponsor',{user:req.session.user});
	}
	else{
		res.redirect('/noprevelige');
	}
	
});

router.get('/logout',function (req,res) {
	req.session.destroy(function (err) {
		res.redirect('/login');
	})
	
})


module.exports=router;