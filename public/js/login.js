$(document).ready(function () {
	$('#username').focus(function () {
		$(this).css('border-color','#68abdc');
	});
	$('#password').focus(function () {
		$(this).css('border-color','#68abdc');
	});
	$('#captcha').focus(function () {
		$(this).css('border-color','#68abdc');
	});
	$('#username').blur(function () {
		$(this).css('border-color','#ccc');
	});
	$('#password').blur(function () {
		$(this).css('border-color','#ccc');
	});
	$('#captcha').blur(function () {
		$(this).css('border-color','#ccc');
	});

});

//重新生成随机码
function rebornCode() {
	var reborntime=new Date().getTime();
	$.post('/login/rebornCode',{time:reborntime},function (result) {
		if(result)
			$('#imgreborn').attr('src','../images/captcha/code'+reborntime+'.png');
		else
			console.log('未获取新随机码');
	});

}

//提交登录信息
function checkLogin() {
	if ($('#username').val()!='' && $('#password').val()!='' && $('#captcha').val()!='') {
		$.ajax({
		type:'post',
		url:'/login/',
		data:{name:$('#username').val().trim(),password:$('#password').val(),captcha:$('#captcha').val().trim()},
		success:function (data) {
			console.log(data);
			if(data=='2'){
				$('#captcha').css('border-color','#f63636');
				rebornCode();
			}

			else if(data=='1')
				location.href='/admin';
			else if(data=='-1')
				console.log('none');
		},
		error:function () {
			console.log('failed');
		}
	});
	}
	else if($('#username').val()==''){
		$('#username').css('border-color','#f63636');
	}
	else if($('#password').val()==''){
		$('#password').css('border-color','#f63636');
	}
	else if($('#captcha').val()==''){
		$('#captcha').css('border-color','#f63636');
	}
	
}