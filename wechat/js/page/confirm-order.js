$(document).ready(function(){

	if(!getcookie('id')){
	    $('#data-list').hide();
	    $('.login').show();
	}else{
	    $('#data-list').show();
	    $('.login').hide();
	}

	//未登录点击跳转
	$('.login').find('a').click(function(){
	    RedirectUrl('login.html?from=' + location.href);
	    return;
	});

	//升级包id和清单id
	var _upgradeIds = new Array();
	var _upgradeItemIds = new Array();
	//获取浏览器参数
    var seriesId = GetQueryString('seriesId');
    var upgradeItemId = GetQueryString('upgradeItemId');
    var upgrdePrice = GetQueryString('upgrdePrice');
    var area = GetQueryString('area');
    var totalPrice = GetQueryString('totalPrice');
    var sceneId = GetQueryString('sceneId');
    //分隔升级包集合把升级包id和清单id封装到对应的集合中
    var str = upgradeItemId.split(',');
    for (var i = 0; i < str.length; i++) {
    	_upgradeIds.push(str[i].split('-')[0]);
    	_upgradeItemIds.push(str[i].split('-')[1]);
    }
    
   	//请求数据
   	$('.ui-loading-block').show();
   	$.ajax({
   	    url: root_path + "myorder/placeAnOrderDell",
   	    type: 'post',
   	    data: {  
   	        "productSeriesId" : seriesId,
   	        "upgradeIds" : _upgradeIds.join(','),
   	        "materialItemsIds" : _upgradeItemIds.join(',')
   	    },
   	    success: function(result) {
   	    	console.log(result);
   	        $('.ui-loading-block').hide();
   	        if(result.code == 1){
   	        	//加载基础数据
   	        	result.object.area = area;
   	        	result.object.totalPrice = totalPrice;
   	        	loadData('#base','#baseTmpl',
   	        		result.object || "");
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

   	//提交页面
   	$('.form-btn').click(function(){
   		RedirectUrl(turn_path + 'submit.html?seriesId=' + seriesId 
            + '&upgradeId=' + _upgradeIds.join(',') + '&upgradeItemId=' + _upgradeItemIds.join(',') +
            '&upgrdePrice=' + upgrdePrice + "&area=" + area +
            '&totalPrice=' + totalPrice + "&sceneId=" + sceneId);
   	});

});