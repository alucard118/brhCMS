var express=require('express');
var router=express.Router();
var title="CNCC2017";

router.get('/',function (req,res) {
	res.redirect('/admin/home');
})

router.get('/home',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_home',{siteTitle:title,user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.render('noprevelige');
	}
	
});
router.get('/news',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('./admin/admin_news',{siteTitle:title,user:req.session.user});
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.render('./admin/noprevelige');
	}
	
});

router.get('/logout',function (req,res) {
	req.session.destroy(function (err) {
		res.redirect('/login');
	})
	
})


module.exports=router;