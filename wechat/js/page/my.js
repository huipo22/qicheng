if (!getcookie('id')) {
    showTips(tipMessage.unlogin_msg, 'login.html?from=' + location.href);
}
$(document).ready(function () {
    var v_img;
    if (!getcookie('photo')) {
        v_img = '../img/my/touxiang2.png';
    } else {
        v_img = image_path + getcookie('photo');
    }
    $('.my_photo').find('img').attr('src', v_img);
    $('.my_photo').find('p').eq(0).html(getcookie('userName'));
    $('.my_photo').find('p').eq(1).html(getcookie('mobile'));
    /*退出登录*/
    $(".ui-btn-bg").click(function(){
        delCookie("id");
        delCookie("gender");
        delCookie("address");
        delCookie("photo");
        delCookie("mobile");
        delCookie("userName");
        RedirectUrl("index.html");
    })
});
