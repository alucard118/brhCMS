var express=require('express');
var router=express.Router();


router.get('/',function (req,res) {
	if(req.session.role=='superAdmin'){
		res.render('admin');
	}
	else if(req.session.user===undefined && req.session.role===undefined){
		res.render('noprevelige');
	}
	
})

module.exports=router;