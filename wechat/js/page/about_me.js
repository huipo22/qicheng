$(document).ready(function(){
    $('.ui-loading-block').show();
    $.ajax({
        url: root_path+"platformconfig/findPlatformconfigList",
        type: 'post',
        async: false,
        success: function(result) {
            $('.ui-loading-block').hide();
            //type==2 是关于我们
            $.each(result.object,function(){
                if(this.type==2){
                    $("#aboutTpl").html(this.content);
                }
            })
        },
        error: function(){
            $('.ui-loading-block').hide();
            showTips(tipMessage.error_msg);
        }
    });
});