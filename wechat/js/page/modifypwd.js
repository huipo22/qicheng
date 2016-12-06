$(document).ready(function(){
    if(!getcookie('id')){
        showTips(tipMessage.unlogin_msg,'login.html?from=' + location.href);
        return;
    }
    $('.ui-btn-bg').click(function(){
        var pwd_reg = new RegExp(/^[0-9a-zA-Z]{6,18}$/);
        if(!$('#old_pwd').val()){
            showTips("请输入原密码！");
            return;
        }
        if(!pwd_reg.test($('#old_pwd').val())){
            showTips('原密码必须为6-18数字或字母！');
            return;
        }
        if(!$('#new_pwd').val()){
            showTips("请输入新密码！");
            return;
        }
        if(!pwd_reg.test($('#new_pwd').val())){
            showTips('新密码必须为6-18数字或字母！');
            return;
        }
        if(!$('#new_ag_pwd').val()){
            showTips("请输入确认密码！");
            return;
        }
        if(!pwd_reg.test($('#new_ag_pwd').val())){
            showTips('确认密码必须为6-18数字或字母！');
            return;
        }
        if($('#new_pwd').val() != $('#new_ag_pwd').val()){
            showTips("新密码和确认密码不一致！");
            return;
        }
        var _this = this;
        disabled_btn(_this);
        $.ajax({
            url: root_path+"user/updatePwd",
            type: 'post',
            data: {  
              "oldPassword": $('#old_pwd').val(),
              "newPassword": $('#new_pwd').val(),
              "confirmPassword": $('#new_ag_pwd').val(),
              "id": getcookie('id')
            },
            success: function(result) {
            	active_btn(_this);
                if(result.code == 1){
                    delCookie('id');
                    delCookie('mobile');
                    delCookie('photo');
                    delCookie('userName');
                    delCookie('gender');
                    delCookie('address');
                   showTips('密码修改成功！',turn_path + "login.html?from=" + location.href);
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