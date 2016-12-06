/**
 * 加载外部模板，并将模板的内容加载到指定的html元素内部
 * 调用
 * 1:在要调用的html页面引入这个js
 * 2:然后在需要加载模板地方使用loadTmpl.renderExternalTemplate("page", "#displayPage", data);
 * page表示模板名称，如page.tmpl.html，只需要传入page即可。并且外部模板必须放在jsViewsTmpls文件夹下
 * #displayPage表示在这个html元素中显示模板的内容
 * data,模板中使用到的json数据
 * @returns {___anonymous_loadTmpl}
 */
loadTmpl = (function() {
	var formatTemplatePath = function(name,prev) {
		if(prev == 1){
			return "../../jsViewsTmpls/" + name + ".tmpl.html";
		}else{
			return "jsViewsTmpls/" + name + ".tmpl.html";
		}
	}, renderTemplate = function(tmplName, targetSelector, data, prev, isT) {
		var file = formatTemplatePath(tmplName, prev);
		$.ajax({
			url : file,
			dataType : 'text',
			success : function(template) {
				var tmpl = $.templates(template);
				var htmlString = tmpl.render(data);
				if (targetSelector) {
					$(targetSelector).html(htmlString);
					if(isT == 1){
						$('.navbar-fixed-bottom').attr('style','padding:0;margin:0 auto;position:relative;height:45px;width:96%;');
					}
				}
				return htmlString;
			},
			error : function(error) {
//				alert(error);
			}
		});
	};
	return {
		formatTemplatePath : formatTemplatePath,
		renderExternalTemplate : renderTemplate
	};
})();