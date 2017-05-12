$(document).ready(function () {
	var left=($(window).width()-$('.modal_center').outerWidth())/2;
	var top=($(window).height()-$('.modal_center').outerHeight())/3;
	$('.modal_center').css({'left':left,'top':top});

	$(window).resize(function () {
		var left=($(window).width()-$('.modal_center').outerWidth())/2;
		var top=($(window).height()-$('.modal_center').outerHeight())/3;
		$('.modal_center').css({'left':left,'top':top});
	});
});