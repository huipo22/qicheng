var root_path = "http://114.215.84.189:9888/qicheng/api/";
var turn_path = "http://114.215.84.189:9888/wechat/html/";
var image_path = "http://114.215.84.189:9888/qicheng";
var tipMessage = {
	error_msg: '服务器异常，稍后重试！',
	undefined_msg: '数据加载失败，稍后重试！',
	unlogin_msg: '请先登录！'
}
var config = {
	nextPage: 0,
	pageSize: 10
}
//页面跳转
function RedirectUrl(url){
	window.location.href = url;
}
//获取URL地址参数
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
}
//加入cookie缓存
function addcookie(name,value,expireHours){
	var cookieString=name+"="+escape(value)+"; path=/";
	//判断是否设置过期时间
	if(expireHours>0){
		var date=new Date();
		date.setTime(date.getTime+expireHours*3600*1000);
		cookieString=cookieString+"; expire="+date.toGMTString();
	}
	document.cookie=cookieString;
}
//获取cookie缓存
function getcookie(name){
	var strcookie=document.cookie;
	var arrcookie=strcookie.split("; ");
	for(var i=0;i<arrcookie.length;i++){
		var arr=arrcookie[i].split("=");
		if(arr[0]==name){
			if(arr[1] && arr[1] != 'undefined'){
				return unescape(arr[1]);
			}
		}
	}
	return "";
}
//删除cookie缓存
function delCookie(name){//删除cookie
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getcookie(name);
	if(cval!=null) document.cookie= name + "="+cval+"; path=/;expires="+exp.toGMTString();
}
//判断arr数组是否存在str
function contains(arr, str) {
    var i = arr.length;
    while (i--) {
           if (arr[i] === str) {
           return true;
        }
    }
    return false;
}
//显示提示的div
function showTips(message,url){
	$('.ui-poptips-cnt').html(message);
	$('.ui-poptips').show();
	if(url){
		setTimeout(function(){$('.ui-poptips').hide();RedirectUrl(url)}, 1500);
	}else{
		setTimeout("$('.ui-poptips').hide()", 1500);
	}
}
//禁止按钮点击效果
function disabled_btn(obj){
	$(obj).addClass('disable_click');
}
//激活按钮点击事件
function active_btn(obj){
	$(obj).removeClass('disable_click');
}
//倒计时效果
function countDown(obj){
	var _timer = new Date();
	_timer.setTime(_timer.getTime()+5*60*1000); //设置date为当前时间+30分
	document.cookie="key2=1; expires="+_timer.toGMTString(); //将date赋值给expires
	var btn = $(obj);
	var count=60;
	var timer=setInterval(function(){
	    count--;
	    btn.html(count+'s');
	    if(count==0){
	        clearInterval(timer);
	        btn.html("重新获取");
	    }
	},1000);
}
/**
 *	发送验证码
 *  obj：当前点击事件的按钮，mobile_obj：要验证的手机号对象
 *  from：来自哪个页面
 *  forget：是否忘记密码，0、注册 1、忘记密码 2、修改手机号
 */
function send_code(obj,mobile_obj,_from,forget){
	if($(obj).html() != '获取验证码' && $(obj).html() != '重新获取'){
	    showTips('请稍后再获取验证码！');
	    return;
	}
	var _info = "手机号";
	if(_from == 2){
		_info = "现手机号";
	}
	if(!$(mobile_obj).val()){
	    showTips('请输入' + _info + '！');
	    return;
	}
	var mobile_reg = new RegExp(/^1[3-9]\d{9}$/);
	if(!mobile_reg.test($(mobile_obj).val())){
	    showTips(_info + '格式不正确！');
	    return;
	}
	disabled_btn(obj);
	$.ajax({
	    url: root_path+"user/sendCode",
	    type: 'post',
	    data: {  
	      "mobile": $(mobile_obj).val(),
	      "forget": forget || ''
	    },
	    success: function(result) {
	        active_btn(obj);
	        if(result.code == 1){
	            countDown(obj);
	        }else{
	            showTips(result.message || tipMessage.undefined_msg);
	        }
	    },
	    error: function(){
	        active_btn(obj);
	        showTips(tipMessage.error_msg);
	    }
	});
}

/**
 * 模板填充
 * fillSeries：是否填充产品系列
 * fillScene: 是否填充场景
 * fillSceneImg: 是否填充场景图片
 * fillItems: 是否填充基础清单
 * fillUpgrade: 是否填充升级包
 * fillUpgradeImg: 是否填充升级包图片
 */
function fillTmpl(fillSeries,fillScene,fillSceneImg,fillItems,fillUpgrade,fillUpgradeImg){
    if(seriesData.length > 0){
        //填充默认的产品名
        if(fillSeries){
            $('#series_id').val(seriesData[_thisSeriesIndex].id);
            $('#series_name').html(seriesData[_thisSeriesIndex].seriesName || "");
            $('#seriesPrice').html(seriesData[_thisSeriesIndex].price/100 || 0);
        }
        //加载模板
        if(seriesData[_thisSeriesIndex].sceneVoList && seriesData[_thisSeriesIndex].sceneVoList.length > 0){
            _thisSeriesId = seriesData[_thisSeriesIndex].sceneVoList[_thisSceneIndex].id;
            if(fillScene){
                //加载场景数据
                loadData('#sceneList','#sceneListTmpl',
                    seriesData[_thisSeriesIndex].sceneVoList || "");
            }
            if(fillItems){
                //基础清单模板数据
                loadData('#itemsList','#itemsListTmpl',
                    seriesData[_thisSeriesIndex].sceneVoList || "");
            }
            if(fillSceneImg){
                //场景图片数据
                seriesData[_thisSeriesIndex].imgurl = seriesData[_thisSeriesIndex].sceneVoList[_thisSceneIndex].imgurl;
                loadData('#sceneImg','#sceneImgTmpl',
                    seriesData[_thisSeriesIndex] || "");
            }
            //升级包信息数据
            if(seriesData[_thisSeriesIndex].sceneVoList[_thisSceneIndex].upgradeList.length > 0){
                if(fillUpgrade){
                    loadData('#upgradeInfo','#upgradeInfoTmpl',
                        seriesData[_thisSeriesIndex].sceneVoList[_thisSceneIndex].upgradeList || "");
                }
                //升级包图片信息数据
                if(seriesData[_thisSeriesIndex].sceneVoList[_thisSceneIndex]
                    .upgradeList[_thisUpgradeIndex].materialItemsList.length > 0){
                    if(fillUpgradeImg){
                        loadData('#upgradeImgList','#upgradeImgListTmpl',
                            seriesData[_thisSeriesIndex].sceneVoList[_thisSceneIndex]
                            .upgradeList[_thisUpgradeIndex].materialItemsList || "");
                    }
                }else{
                    $('#upgradeImgList').empty();
                }
            }else{
                $('#upgradeInfo,#upgradeImgList').empty();
            }
        }else{
        	$('#upgradeInfo,#upgradeImgList,#sceneImg,#itemsList,#sceneList').empty();
        }
    }
}

//加载数据
function loadData(target,tmpl,data){
    var temp = $(tmpl).render(data);
    $(target).html(temp);
}