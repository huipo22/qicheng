$(document).ready(function(){

	if(!getcookie('id')){
	    showTips(tipMessage.unlogin_msg,'login.html?from=' + location.href);
	    return;
	}

	//获取收藏id
	var id = GetQueryString("id");

	//加载详情数据
	$('.ui-loading-block').show();
	$.ajax({
	    url: root_path + "myhistory/findone",
	    type: 'post',
	    data: {  
	      "id": id
	    },
	    success: function(result) {
	    	$('.ui-loading-block').hide();
	        if(result.code == 1){
	        	$('#main_img').attr('src',image_path + result.object.logo).css('height',$(window).width()/2);
	        	$('#seriesName').html('产品系列：' + result.object.seriesName);
  	        	//加载基础清单
	            loadData('#itemsList','#itemsListTmpl',
	            	result.object.sceneVoList || "");
	        }else{
	        	showTips(result.message || tipMessage.undefined_msg);
	        }
	    },
	    error: function(){
	    	$('.ui-loading-block').hide();
	        showTips(tipMessage.error_msg);
	    }
	});

});