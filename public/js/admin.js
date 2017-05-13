$(document).ready(function () {
	$('#createNews').click(function () {
		location.href="/admin/createNews";
	});

	$('#setTop').bind('click',function () {
		if($('#setTop').is(':checked')){
			
			$('#topEndTime').fadeIn('fast');
		}
		else{
			$('#topEndTime').fadeOut('fast');
			$('#topEndTime').val('');
		}
	})

	$('#newsSave').click(function () {
		var editor = CKEDITOR.instances.newsContent;
		
		if($('#newsTitle').val()=='')
			$('#newsTitle').css('border-color','#ea2828');
		
		else if(editor.getData()=='')
			alert('content');
		else{
			$.ajax({
				type:'post',
				url:'/admin/news',
				data:{
					id:$('#newsId').val(),
					newsTitle:$('#newsTitle').val(),
					newsTopic:$('#newsTopic').val(),
					topEndTime:$('#topEndTime').val(),
					newsContent:editor.getData(),
					published:$('#published').val()
				},
				success:function (data) {
					$('#newsId').val(data);
					$('.newsNote').text('已保存').fadeOut(5000);
				},
				error:function () {
					console.log('failed');
				}
			});
		}
		
	});
		
});