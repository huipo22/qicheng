$(document).ready(function(){
    if(!getcookie('id')){
        showTips(tipMessage.unlogin_msg,'login.html?from=' + location.href);
        return;
    }
    $('input[type="text"]').val(getcookie('address'));
    $('.ui-btn-bg').click(function(){
        if(!$('input[type="text"]').val()){
            showTips('请输入地址');
            return;
        }else if($('input[type="text"]').val().length>50){
            showTips('请最多输入50个字！');
            return;
        }
        var _this = this;
        disabled_btn(_this);
        $.ajax({
            url: root_path+"user/updateUser",
            type: 'post',
            data: {  
              "address": $('input[type="text"]').val(),
              "id": getcookie('id')
            },
            success: function(result) {
                active_btn(_this);
                if(result.code == 1){
                   delCookie('address');
                   addcookie('address',$('input[type="text"]').val());
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