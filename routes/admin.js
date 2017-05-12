var express=require('express');
var router=express.Router();

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
		res.render('./admin/admin_news',{user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.render('noprevelige');
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