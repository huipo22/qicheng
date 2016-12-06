$(function(){
	var username = window.sessionStorage.getItem("userName")
	var id = window.sessionStorage.getItem("gender")
	var nannv = "";
	$("#username").text(username);
	if (id == 0) {
		nannv = "先生"
	} else if (id == 1) {
		nannv = "女士"
	}
	$("#nannv").text(nannv)
	if (username == "") {
		$("#username").text("")
	} else {
		$("#username").text(username);
		if($("#username").text() == "null"){
			$("#username").css("display","none");
			$("#nannv").css("display","none")
		}
	}
})
var root_path = "http://114.215.84.189:9888/qicheng/api/";
var image_path = "http://114.215.84.189:9888/qicheng";
//返回图片路径
$.views.converters("getImagePath", function(url) {
	return image_path + url;
});
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
//获取订单编号
function getorderno(){
	var url=window.location.search;
	var substr=url.substr(1);
	return substr;
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
	if(arr[0]==name)return arr[1];
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
//为导航条ul添加事件
$(document).ready(function(){
	$(".nav ul").attr("class","headerul")
	var arr=[];
	var li=$(".nav ul li a");
	for(i=0;i<li.length;i++){
	arr.push($(".nav ul li a")[i])
	}
	//console.log(arr)

	var addr=window.location.pathname;
	var i=addr.lastIndexOf("/")
	var a=addr.substr(i+1)
	if(a=="index.html"){
		arr[0].className="active"
	}else if(a=="productLine.html"||a=="confirmIndent.html"){
		arr[1].className="active"
	}else if(a=="case.html"||a=="Case-details.html"){
		arr[2].className="active"
	}else if(a=="platform.html"){
		arr[3].className="active"
	}



})
/*左边导航栏*/
	function leftnav(){
		$(".content").find("ul").attr("class","leftnav");
		var index=$(this).index();
		var arr=[];
		var li=$(".leftnav li a");
		for(i=0;i<li.length;i++){
			arr.push($(".leftnav li a")[i])
		}
		var addr=window.location.pathname;
		var i=addr.lastIndexOf("/");
		var a=addr.substr(i+1);
		//console.log(a)
		if(a=="mydata.html"||a=="editing.html"|| a=="phoneNumber.html"){
			arr[0].className="defaultSetting"
		}else if(a=="myCollect.html"||a=="collectDetails.html"){
			arr[1].className="defaultSetting"
		}else if(a=="myIndent.html"||a=="indentDetails.html"){
			arr[2].className="defaultSetting"
		}else if(a=="newPassword.html"){
			arr[3].className="defaultSetting"
		}else if(a=="feedback.html"){
			arr[4].className="defaultSetting"
		}
	}
//判断 用户是否登录
function islogin(){
	var userName=window.sessionStorage.getItem("userName")
	if(userName!=null){
		return true
	}else{
		return false
	}
}
$(document).ready(function(){

	if(window.sessionStorage.getItem("id")){
		$(".ul1>li:last>a").text("退出")
	}else{
		if((window.location.href.search("index"))!=-1) {
			$(".ul1>li:first").html("<a href='pages/register.html' style='margin-right:20px;font-size:15px;color: #fff;'>注册</a>")
		}else{
			$(".ul1>li:first").html("<a href='register.html' style='margin-right:20px;font-size:15px;color: #fff;'>注册</a>")
		}
		$(".ul1>li:last>a").text("登录")
	}
	//退出页面
	$(".ul1>li:last").click(function(){
		if($(".ul1>li:last>a").text()=="退出") {
			/*清除session数据*/
			window.sessionStorage.clear();
		}
	})


})
//禁止选中
document.onselectstart=function(){return false;}


