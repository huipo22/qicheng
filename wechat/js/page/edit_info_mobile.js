$(document).ready(function(){
    if(!getcookie('id')){
        showTips(tipMessage.unlogin_msg,'login.html?from=' + location.href);
        return;
    }
    //获取验证码
    $('.ui-border-l').click(function(){
        if($('#old_mobile').val()!=getcookie("mobile")){
            showTips('原手机号不正确');
            return;
        }
        send_code(this,'#new_mobile',2,'');
    });
    $('#modity_mobile').click(function(){
        if(!$('#old_mobile').val()){
            showTips('请输入原手机号');
            return;
        }
        if($('#old_mobile').val()!=getcookie("mobile")){
            showTips('原手机号不正确');
            return;
        }
        var mobile_reg = new RegExp(/^1[3-9]\d{9}$/);
        if(!mobile_reg.test($('#old_mobile').val())){
            showTips('原手机号格式不正确！');
            return;
        }
        if(!$('#new_mobile').val()){
            showTips('请输入现手机号');
            return;
        }
        if(!mobile_reg.test($('#new_mobile').val())){
            showTips('现手机号格式不正确！');
            return;
        }
        if(!$('#code').val()){
            showTips('请输入验证码');
            return;
        }
        var _this = this;
        disabled_btn(_this);
        $.ajax({
            url: root_path+"user/updateMobile",
            type: 'post',
            data: {  
              "oldMobile": $('#old_mobile').val(),
              "newMobile": $('#new_mobile').val(),
              "code": $('#code').val(),
              "id": getcookie('id')
            },
            success: function(result) {
                active_btn(_this);
                if(result.code == 1){
                    delCookie('mobile');
                    addcookie('mobile',$('#new_mobile').val());
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