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