$(document).ready(function(){
    $('.ui-loading-block').show();
    $.ajax({
        url: root_path+"brand/findBrandList",
        type: 'post',
        async: false,
        data: {  
          "nextPage": 0,
          "pageSize": 1000
        },
        success: function(result) {
            $('.ui-loading-block').hide();
            var mainArr = new Array();
            var childArr = new Array();
            $.each(result.object,function(){
                if(this.type == 1){
                    mainArr.push(this);
                }else{
                    childArr.push(this); 
                }
            });
            var temp=$("#main_content_tmpl").render(mainArr);
            $("#main_content").html(temp);
            var temp1=$("#child_content_tmpl").render(childArr);
            $("#child_content").html(temp1);
            if($('#main_content').find('li').length > 0){
                $('#main_content').find('img').css('height',$('#child_content')
                    .find('li').eq(0).width());
            }
            if($('#child_content').find('li').length > 0){
                $('#child_content').find('img').css('height',$('#child_content')
                    .find('li').eq(0).width());
            }
        },
        error: function(){
            $('.ui-loading-block').hide();
            showTips(tipMessage.error_msg);
        }
    });
    
});