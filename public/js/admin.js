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

	$('#upload_newsImg').click(function () {
			if ($('#newsImg>input').val()!='') {
				var formData=new FormData($('#newsImg')[0]);
				var newsImgName=$('#newsImg>input').val();
				newsImgName=newsImgName.split('\\');
				newsImgName=newsImgName[newsImgName.length-1];
				$.ajax({
					type:'post',
					url:'/admin/newsImg',  
	          		processData: false,
					contentType: false,
					data:formData,
					success:function (data) {
						$('#uploadedImg>img').attr('src',data);
					},
					error:function () {
						console.log('upload images failed');
					}
				})
			}
	});

	$('#del_newsImg').click(function () {
		$('#uploadedImg>img').attr('src','/images/newsDefaultImg.jpg');
	});

	$('#newsSave').click(function () {
		var editor = CKEDITOR.instances.newsContent;
		if($('#newsTitle').val()==''){
			$('#newsTitle').css('border-color','#ea2828');
			return false;
		}
		
		else if(editor.getData()==''){

			alert('content');
			return false;
		}
		else{

			var newsImgName=$('#uploadedImg>img').attr('src');
			newsImgName=newsImgName.split('/');
			if(newsImgName[newsImgName.length-1]!='newsDefaultImg.jpg')
				newsImgName='/news/'+newsImgName[newsImgName.length-1];
			else
				newsImgName='';
			$.ajax({
				type:'post',
				url:'/admin/news',  
				data:{
					id:$('#newsId').val(),
					newsTitle:$('#newsTitle').val(),
					newsTopic:$('#newsTopic').val(),
					topEndTime:$('#topEndTime').val(),
					newsContent:editor.getData(),
					published:$('#published').val(),
					img:newsImgName
				},
				success:function (data) {
					$('#newsId').val(data);
				},
				error:function () {
					console.log('failed');
				}
			});
		}
		
	});
		
});