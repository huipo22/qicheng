$(function(){
	ajax();//Ajax����
})


//Ajax����
function ajax(){
	var mobile=getcookie("mobile")
	var password=getcookie("password")
	if(mobile!=""&&password!="") {
		$.ajax({
			url: root_path + "user/login",
			type: 'post',
			async: false,
			data: {
				mobile: mobile,
				password: password
			},
			success: function (result) {
				if (result.code == 1) {
					window.sessionStorage.setItem("gender", result.object.gender)
					window.sessionStorage.setItem("userName", result.object.userName)
					window.sessionStorage.setItem("id", result.object.id)
				}
			}
		});
	}
	$.ajax({
		url: root_path + "banner/findBannerList?nextPage=0&pageSize=10",
		type: 'post',
		async: false,
		success: function (result) {
			if(result.code==1) {
				var arr = result.object;
				var arrB = [];
				var arrS = [];
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].type) {
						arrS.push(arr[i])
					} else {
						arrB.push(arr[i])
					}
				}
				var i = arrB.length;
				var str = "";
				for (a = 0; a < i; a++) {
					str += "<li></li>"
				}
				$("#banner_circel").html(str);
				var temp = $("#banner_picture").render(arrB);
				$(".bbb").html(temp);
				var temp = $("#s_picture").render(arrS);
				$(".spicture").html(temp);
			}else{
				alert("数据加载失败")
			}
		},
		error:function(){
			alert("服务器异常，稍后重试")
		}
	})
}



