$(document).ready(function () {
	var left=($(window).width()-$('.zdjz').outerWidth())/2;
	var top=($(window).height()-$('.zdjz').outerHeight())/3;
	$('.zdjz').css({'left':left,'top':top});

	$(window).resize(function () {
		var left=($(window).width()-$('.zdjz').outerWidth())/2;
		var top=($(window).height()-$('.zdjz').outerHeight())/3;
		$('.zdjz').css({'left':left,'top':top});
	});
});