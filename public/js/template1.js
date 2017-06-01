$(document).ready(function () {
	$(window).resize(function () {
		if($(window).width()<1024)
			$('.collapse').collapse();
	});
});