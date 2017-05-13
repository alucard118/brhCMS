var express=require('express');
var router=express.Router();
var dbController=require('../model/dbController.js');

router.get('/',function (req,res) {
	res.redirect('/admin/home');
})

router.get('/home',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_home',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.render('noprevelige');
	}
	
});
router.get('/news',function (req,res) {
	if(req.session.role=='superAdmin'){
		dbController.showNews(null,function (result) {
			res.render('./admin/admin_news',{user:req.session.user,newsList:result});
		})
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.render('noprevelige');
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
					res.send('1');
					console.log('已更新');
				}
				else
					res.send('0');
			})
		}
		
	}
});
router.get('/createNews',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_createNews',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.render('noprevelige');
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
		res.render('noprevelige');
	}
	
});
router.get('/date',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_date',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.render('noprevelige');
	}
	
});
router.get('/speaker',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_speaker',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.render('noprevelige');
	}
	
});
router.get('/sponsor',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_sponsor',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.render('noprevelige');
	}
	
});

router.get('/logout',function (req,res) {
	req.session.destroy(function (err) {
		res.redirect('/login');
	})
	
})


module.exports=router;