$(document).ready(function(){

	//未登录点击跳转
	if(!getcookie('id')){
	    RedirectUrl('login.html?from=' + location.href);
	}

	//获取浏览器参数
	var seriesId = GetQueryString('seriesId');
	var upgradeId = GetQueryString('upgradeId');
	var upgradeItemId = GetQueryString('upgradeItemId');
	var upgrdePrice = GetQueryString('upgrdePrice');
	var area = GetQueryString('area');
	var totalPrice = GetQueryString('totalPrice');
	var sceneId = GetQueryString('sceneId');

	//点击提交
	$("#submit").click(function (e) {
		e.preventDefault();
	    if(!$('.name').val()){
	    	showTips('请输入姓名！');
	    	$('.name').focus();
	    	return;
	    }
	    if(!(/^[a-zA-Z ]{1,20}$/.test($('.name').val()) || /^[\u4e00-\u9fa5]{1,10}$/.test($('.name').val()))){
	    	showTips('请输入正确的联系人姓名！');
	    	$('.name').focus();
	    	return;
	    }
	    if(!$('.Mobile').val()){
	    	showTips('请输入联系方式！');
	    	$('.Mobile').focus();
	    	return;
	    }
	    var mobile_reg = new RegExp(/^1[3-9]\d{9}$/);
	    if(!mobile_reg.test($('.Mobile').val())){
	        showTips('联系方式格式不正确！');
	        return;
	    }
	    if(!$('.address').val()){
	    	showTips('请输入地址！');
	    	$('.address').focus();
	    	return;
	    }
	    //发送数据
	    var _this = this;
	    disabled_btn(_this);
	    $.ajax({
	        url: root_path + "myorder/placeAnOrder",
	        type: 'post',
	        data:{
	            "userId" : getcookie('id'),
	            "realName" : $('.name').val(),
	            "mobile" : $('.Mobile').val(),
	            "address" : $('.address').val(),
	            "area" : area,
	            "productSeriesId" : seriesId,
	            "sceneIds" : sceneId,
	            "upgradeIds" : upgradeId,
	            "materialItemsIds" : upgradeItemId,
	            "upgradePice" : upgrdePrice,
	            "pice" : totalPrice
	        },
	        success: function (data) {
	        	active_btn(_this);
	        	if(data.code == 1){
	        	   showTips('下单成功！', turn_path + 'myorder.html');
	        	}else{
	        	    showTips(data.message || tipMessage.undefined_msg);
	        	}
	        },
            error: function(){
                active_btn(_this);
                showTips(tipMessage.error_msg);
            }
	    });
	});

});