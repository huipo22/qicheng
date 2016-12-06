$(document).ready(function(){

	if(!getcookie('id')){
	    showTips(tipMessage.unlogin_msg,'login.html?from=' + location.href);
	    return;
	}

	getMyOrderList();

	//滚动加载数据
	$(window).scroll(function (e) {
	    e.preventDefault();
	    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
	    if ($(document).height() <= totalheight) {
	        //此处调用数据加载方法
	        if($("#lastPage").val() == 'true'){
	            showTips('数据已经加载完毕');
	            return;
	        }
	        //此处加一个判断是否有下一页，如果有取下一页索引
	        if($("#lastPage").val() == 'false'){
	            var n = parseInt($("#nowPageNumber").val()) + 1;
	            getMyOrderList(n);
	        }
	    }
	});

});

//请求我的订单数据
function getMyOrderList(nextPage){
	$('.ui-loading-block').show();
	$.ajax({
	    url: root_path+"myorder/findMyorderLists",
	    type: 'post',
	    data: {  
	      "userId": getcookie('id'),
	      "nextPage": nextPage || config.nextPage,
	      "pageSize": config.pageSize
	    },
	    success: function(result) {
	    	console.log(result);
	    	$('.ui-loading-block').hide();
	        if(result.code == 1){
	        	if(result.object.content && result.object.content.length > 0){
		        	var temp = $("#myorder_tmpl").render(result.object.content);
		        	$('#myorder').append(temp);
		        	$("#nowPageNumber").val(result.object.number|| config.nextPage);
		        	$('#lastPage').val(result.object.lastPage);
	        	}else{
	        		showTips("您还没有订单，赶快去下单吧！");
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
}