$(document).ready(function(){
    if(!getcookie('id')){
        showTips(tipMessage.unlogin_msg,'login.html?from=' + location.href);
        return;
    }
    //默认选中
    if(getcookie('gender') == 0){
        $('.radio_gender').eq(0).attr('src','../img/my/radio_check.png');
        $('.radio_gender').eq(0).attr('src','../img/my/radio_check.png').addClass('active_gender');
    }else if(getcookie('gender') == 1){
        $('.radio_gender').eq(1).attr('src','../img/my/radio_check.png');
        $('.radio_gender').eq(1).attr('src','../img/my/radio_check.png').addClass('active_gender');
    }
    //性别选择
    $('.radio_gender').click(function(){
        $('.radio_gender').attr('src','../img/my/radio.png').removeClass('active_gender');
        $(this).attr('src','../img/my/radio_check.png').addClass('active_gender');
    });
    //保存性别
    $('.ui-btn-bg').click(function(){
        //if(!$('.active_gender').attr('data-gender')){
        //    showTips('请选择性别');
        //    return;
        //}
        var _this = this;
        disabled_btn(_this);
        $.ajax({
            url: root_path+"user/updateUser",
            type: 'post',
            data: {
              "gender": $('.active_gender').attr('data-gender'),
              "id": getcookie('id')
            },
            success: function(result) {
                active_btn(_this);
                if(result.code == 1){
                   delCookie('gender');
                   addcookie('gender',$('.active_gender').attr('data-gender'));
                   RedirectUrl('edit_info.html');
                }else{
                    showTips(result.message || tipMessage.undefined_msg);
                }
            },
            error: function(){
                active_btn(_this);
                showTips(tipMessage.error_msg);
            }
        });
    });
});