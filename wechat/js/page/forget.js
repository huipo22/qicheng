$(document).ready(function(){
    //获取验证码
    $('.ui-border-l').click(function(){
        send_code(this,'#mobile',1,'forget');
    });
    //提交
    $('.ui-btn-bg').click(function(){
        if(!$('#mobile').val()){
            showTips('请输入手机号！');
            return;
        }
        var mobile_reg = new RegExp(/^1[3-9]\d{9}$/);
        if(!mobile_reg.test($('#mobile').val())){
            showTips('手机号格式不正确！');
            return;
        }
        if(!$('#code').val()){
            showTips('请输入验证码！');
            return;
        }
        var pwd_reg = new RegExp(/^[0-9a-zA-Z]{6,18}$/);
        if(!$('#password').val()){
            showTips('请输入密码！');
            return;
        }
        if(!pwd_reg.test($('#password').val())){
            showTips('密码必须为6-18数字或字母！');
            return;
        }
        if(!$('#password_again').val()){
            showTips('请输入确认密码！');
            return;
        }
        if(!pwd_reg.test($('#password_again').val())){
            showTips('确认密码必须为6-18数字或字母！');
            return;
        }
        if($('#password').val() != $('#password_again').val()){
            showTips('两次密码输入不一致！');
            return;
        }
        var _this = this;
        disabled_btn(_this);
        $.ajax({
            url: root_path+"user/forgetPwd",
            type: 'post',
            data: {  
              "mobile": $('#mobile').val(),
              "code": $('#code').val(),
              "newPassword": $('#password').val()
            },
            success: function(result) {
                active_btn(_this);
                if(result.code == 1){
                    showTips('密码修改成功，请重新登录！',turn_path + "login.html");
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