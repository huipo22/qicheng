/**
 * Created by Administrator on 2016/5/17.
 */
var myVar;
$(function(){
    $.ajax({
        url: root_path + "banner/findBannerList",
        type: 'post',
        async: false,
        success: function (result) {
            var arr = result.object;
            var arrB = [];
            var arrS = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].type) {
                    arrS.push(arr[i])
                } else {
                    arrB.push(arr[i])
                }
            }
            var temp = $("#main_content_banner").render(arrB);
            $(".ui-slider-content").html(temp);//.css('width',(arrB.length * 100) + "%")
            var temp1 = $("#main_content_series").render(arrS);
            $(".style").html(temp1);
        }
    });

    myVar = setInterval('scrollImg();',100);

});

//轮播图事件
function scrollImg(){
    if($(".ui-slider-content").find('li').length > 0){
        var slider = new fz.Scroll('.ui-slider', {
            role: 'slider',
            indicator: true,
            autoplay: true,
            interval: 3000
        });
        clearTimeout(myVar);
    }
}
