$(document).ready(function(){

	if(!getcookie('id')){
	    showTips(tipMessage.unlogin_msg,'login.html?from=' + location.href);
	    return;
	}

	//请求收藏数据
	$('.ui-loading-block').show();
	$.ajax({
	    url: root_path+"myhistory/findMyhistoryById",
	    type: 'post',
	    data: {  
	      "userId": getcookie('id'),
	      "nextPage": config.nextPage,
	      "pageSize": config.pageSize
	    },
	    success: function(result) {
	    	$('.ui-loading-block').hide();
	        if(result.code == 1){
	        	if(result.object.content && result.object.content.length > 0){
		        	var temp = $("#myhistory_tmpl").render(result.object.content);
		        	$('#myhistory').html(temp);
		        	if($('#myhistory').find('.ui-slider').length > 0){
		        		$('#myhistory').find('img').css('height',$(window).width()/2);
		        	}
	        	}else{
	        		showTips("您还没有收藏，赶快去收藏吧！");
	        	}
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