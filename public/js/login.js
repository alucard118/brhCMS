$(document).ready(function () {
	var left=($(window).width()-$('.login').outerWidth())/2;
	var top=($(window).height()-$('.login').outerHeight())/3;
	$('.login').css({'left':left,'top':top});

	$(window).resize(function () {
		var left=($(window).width()-$('.login').outerWidth())/2;
		var top=($(window).height()-$('.login').outerHeight())/3;
		$('.login').css({'left':left,'top':top});
	});

});

function rebornCode() {
	var reborntime=new Date().getTime();
	$.post('/login/rebornCode',{time:reborntime},function (result) {
		console.log(result);
		$('#imgreborn').attr('src','../images/captcha/code'+reborntime+'.png');
	});

}