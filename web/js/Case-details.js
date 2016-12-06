/**
 * Created by Administrator on 2016/4/14.
 */
var id = getorderno();
$(document).ready(function(){
    $.ajax({
        url: root_path+"successCase/findSuccessCaseListBySuccessCaseId",
        type: 'post',
        async: false,
        data: {
            "nextPage": 0,
            "cashId":id
        },
        success: function(data) {
            var aa = data.object;
            console.log(aa)
            var temp1=$("#intro-tmpl").render(aa);
            $("#content-box").html(temp1);
        }
    });

});
//�ͻ�����Сͼ������ִ�ͼ

function bigImg(){
    var event=window.event||arguments.callee.caller.arguments[0];
    $('body').css("overflow","hidden")
    $(".mask").show()
    var gg=$(event.target)
    //��¡ͼƬimg
    var cloneImg= gg.clone();
    $(".Image").html(cloneImg);
    $(".Image").show();
     //autoCenter();
}



function autoCenter(){
    var clientWidth=
        document.documentElement.clientWidth||document.body.clientWidth;
    var clientHeight=
        document.documentElement.clientHeight||document.body.clientHeight;
    var top= $(window).scrollTop();
    var mask=$(".mask").width();
    console.log(top)
    $(".mask").css({
        "width":clientWidth+"px",
        "height":clientHeight+"px",
        "top":top+"px",
        "left":0+"px"
    })
    $(".Image").css({
        "top":top+(clientHeight-600)/2+"px",
        "left":(clientWidth-1000)/2+"px"
    })
}
function hide(){
    $('body').css("overflow","")
    $(".mask").hide()
    $(".Image").hide();
}
function zz(){
    var lastScrollTop = 0;
        var st = $(".Img").scrollTop();
        console.log(st)
        if (st > lastScrollTop){
           alert(111)
        } else {
          alert(222)  // upscroll code
        }
        lastScrollTop = st;
}

//判断是否登录
$(document).ready(function(){
    if(islogin()){
        $(".div1").hide();
        $(".div2").show();
    }else{
        $(".div1").show();
        $(".div2").hide();
    }
})
$(document).ready(function(){
    $(".price").text("￥"+Number($(".price").text().substr(1)).toFixed(2))
})
window.onload=function(){
    var price = $(".price").text();
    var s=price.split("￥")[1];
    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");

    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    console.log( s)
    $(".price").html("￥"+s)

    $(".islogin").click(function (e) {
        e.preventDefault();
        RedirectUrl('login.html?from=' + location.href)
    })

}