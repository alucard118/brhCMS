$(document).ready(function () {
	$('#createNews').click(function () {
		location.href="/admin/createNews";
	});

	$('#setTop').bind('click',function () {
		if($('#setTop').is(':checked')){
			
			$('#endTime').fadeIn('fast');
		}
		else{
			$('#endTime').fadeOut('fast');
			$('#endTime').val('');
		}
	})
		
});