$(document).ready(function(){
    if(!getcookie('id')){
        showTips(tipMessage.unlogin_msg,'login.html?from=' + location.href);
        return;
    }
    //提交反馈意见
    $('.ui-btn-bg').click(function(){
        if(!$('.feedback_textarea').val()){
            showTips('请输入您的宝贵意见！');
            return;
        }
        var _this = this;
        disabled_btn(_this);
        $.ajax({
            url: root_path+"feedBack/saveFeedBack",
            type: 'post',
            data: {  
              "userId": getcookie('id'),
              "content": $('.feedback_textarea').val()
            },
            success: function(result) {
            	active_btn(_this);
                showTips('您的宝贵意见已提交！');
                RedirectUrl('my.html');
            },
            error: function(){
                active_btn(_this);
                showTips(tipMessage.error_msg);
            }
        });
    });
});