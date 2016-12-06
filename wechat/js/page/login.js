$(document).ready(function(){
    var t_url = GetQueryString("from") || 'index.html';
    //登录
    $('.ui-btn-bg').click(function(){
        if(!$('input[type="text"]').val()){
            showTips('请输入手机号');
            return;
        }
        var mobile_reg = new RegExp(/^1[3-9]\d{9}$/);
        if(!mobile_reg.test($('input[type="text"]').val())){
            showTips('手机号格式不正确');
            return;
        }
        if(!$('input[type="password"]').val()){
            showTips('请输入密码');
            return;
        }
        var _this = this;
        disabled_btn(_this);
        $.ajax({
            url: root_path+"user/login",
            type: 'post',
            data: {  
              "mobile": $('input[type="text"]').val(),
              "password": $('input[type="password"]').val()
            },
            success: function(result) {
                console.log(result);
                active_btn(_this);
                if(result.code == 1){
                    addcookie('id',result.object.id);
                    addcookie('mobile',result.object.mobile);
                    addcookie('photo',result.object.photo);
                    addcookie('userName',result.object.userName);
                    addcookie('gender',result.object.gender);
                    addcookie('address',result.object.address);
                    RedirectUrl(t_url);
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