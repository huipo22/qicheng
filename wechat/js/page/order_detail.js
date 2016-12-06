$(document).ready(function(){

	if(!getcookie('id')){
	    showTips(tipMessage.unlogin_msg,'login.html?from=' + location.href);
	    return;
	}

	//获取订单编号
	var orderNo = GetQueryString("orderno");

	//加载详情数据
	$('.ui-loading-block').show();
	$.ajax({
	    url: root_path+"myorder/findMyorderById",
	    type: 'post',
	    data: {  
	      "orderNo": orderNo
	    },
	    success: function(result) {
	    	console.log(result);
	    	$('.ui-loading-block').hide();
	        if(result.code == 1){
  	        	loadData('#base','#baseTmpl',
  	        		result.object || "");
  	        	//加载基础清单
	            loadData('#itemsList','#itemsListTmpl',
	            	result.object.scencelist || "");
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