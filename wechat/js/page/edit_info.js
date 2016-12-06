$(document).ready(function(){

    if(!getcookie('id')){
        showTips(tipMessage.unlogin_msg,'login.html?from=' + location.href);
        return;
    }

    //赋值
    $("#imgUrl").val(getcookie('photo'));
    if(getcookie('photo')){
        $("#myImageShow").attr('style', "background:url('" + image_path + getcookie('photo') + "') no-repeat center center;;background-size: 100%;");
        $(".ui-avatar").css("background-image","none")
    }else{
        $("#myImageShow").attr('style', "background:url('../img/my/xiangji.png') no-repeat center center;;background-size: 60%;");
        $("#myImageShow").parent().css('right','20px');
    }
    $("#userName").val(getcookie('userName'));
    $("#gender").val(getcookie('gender') == 0 ? '男' : '女');
    $("#mobile").val(getcookie('mobile'));
    $("#address").val(getcookie('address'));

    //保存头像
    $('.ui-btn-bg').click(function(){
        var _this = this;
        disabled_btn(_this);
        $.ajax({
            url: root_path+"user/updateUser",
            type: 'post',
            data: {
                "photo": $('#imgUrl').val(),
                "id": getcookie('id')
            },
            success: function(result) {
                active_btn(_this);
                if(result.code == 1){
                    delCookie('photo');
                    addcookie('photo',$('#imgUrl').val());
                    RedirectUrl('my.html');
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

    upload("user");

});

//头像上传
function upload(modelName) {
    $(document).on('change', '#uploadPhotoFile', function() {
        $.ajaxFileUpload({
            url : root_path + modelName + '/photoUpload',
            secureuri : false,
            fileElementId : 'uploadPhotoFile',
            type : 'POST',
            dataType : 'json',
            success : function(data, status) {
                console.log(data);
                if (data) {
                    $("#imgUrl").val(data.split(',')[0]);
                    var v_img = image_path + data.split(',')[0] || '../img/my/photo.png';
                    $("#myImageShow").attr('style', "background:url('" + v_img + "') no-repeat center center;background-size: 100%;");
                    $(".ui-avatar").css("background-image","none")
                }else{
                    showTips("上传失败！");
                }
            },
            error: function(){
                active_btn(_this);
                showTips(tipMessage.error_msg);
            }
        });
    });
}