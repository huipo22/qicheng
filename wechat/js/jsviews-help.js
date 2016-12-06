//返回图片路径
$.views.converters("getImagePath", function(url) {
	return image_path + url;
});
//格式化时间 返回结果：yyyy-MM-dd
$.views.converters("convertTime", function(strTime) {
	if(!strTime){
		return "";
	}
	return strTime.split(' ')[0];
});