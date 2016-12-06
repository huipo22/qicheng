
$(function(){
    var username = window.sessionStorage.getItem("userName")
    var id = window.sessionStorage.getItem("gender")
    var nannv = "";
    $("#username").text(username);
    if (id == 0) {
        nannv = "先生"
    } else if (id == 1) {
        nannv = "女士"
    }
    $("#nannv").text(nannv)
    if (username == "") {
        $("#username").text("")
    } else {
        $("#username").text(username);
        if($("#username").text() == "null"){
            $("#username").css("display","none");
            $("#nannv").css("display","none")
        }
    }
})
var root_path = "http://114.215.84.189:9888/qicheng/api/";
var image_path = "http://114.215.84.189:9888/qicheng";
var nextPage = 0;
var pageSize = 10;
/*分页功能*/
function PagesFun(Pages) {
    $(document).on("click", ".paginationPage", function () {
        //
        $(".hint").html("");
        var activeFlag = $(this).hasClass("active");
        var disableFlag = $(this).hasClass("disabled");
        if (!activeFlag && !disableFlag) {
            var nextPage = $(this).attr("thispage");
            //当前的点击页数
            $("#_click_page").val(nextPage);
            //Pages() --> 模板里的分页函数
            Pages(nextPage);
            dd();
        }

    })
    $(document).on("click", ".button", function () {
        var page = $(".input-box1").find("input").val() - 1;
        if (Number($(".input-box1").find("input").val()) == 0) {
            Pages(0);
            return
        }
        if(Number($(".input-box1").find("input").val())>$(".total_page").text()){
            Pages($(".total_page").text()-1);
            dd();
            return;
        }else{
            Pages(page);
            dd();
        }

    })
    $(document).on("keydown", ".input-box1 input", function (e) {
        if (e.keyCode == 13) {
            var page = $(".input-box1").find("input").val() - 1;
            if (Number($(".input-box1").find("input").val()) == 0) {
                Pages(0);
                dd();
                return
            } if(Number($(".input-box1").find("input").val())>$(".total_page").text()){
                Pages($(".total_page").text()-1);
                dd();
                return;
            }else{
                Pages(page);
                dd();
            }
        }
    })
}

//页面跳转
function RedirectUrl(url) {
    window.location.href = url;
}
//获取URL地址参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//获取订单编号
function getorderno() {
    var url = window.location.search;
    var substr = url.substr(1);
    return substr;
}
//加入cookie缓存
function addcookie(name, value, expireHours) {
    var cookieString = name + "=" + escape(value) + "; path=/";
    //判断是否设置过期时间
    if (expireHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expireHours * 3600 * 1000);
        cookieString = cookieString + "; expire=" + date.toGMTString();
    }
    document.cookie = cookieString;
}
//获取cookie缓存
function getcookie(name) {
    var strcookie = document.cookie;
    var arrcookie = strcookie.split("; ");
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name)return arr[1];
    }
    return "";
}
//删除cookie缓存
function delCookie(name) {//删除cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getcookie(name);
    if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}
//判断arr数组是否存在str
function contains(arr, str) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === str) {
            return true;
        }
    }
    return false;
}
//为导航条ul添加事件
$(document).ready(function () {
    $(".nav ul").attr("class", "headerul")
    var arr = [];
    var li = $(".nav ul li a");
    for (i = 0; i < li.length; i++) {
        arr.push($(".nav ul li a")[i])
    }
    //console.log(arr)

    var addr = window.location.pathname;
    var i = addr.lastIndexOf("/")
    var a = addr.substr(i + 1)
    if (a == "index.html" || a == "construction.html" || a == "manage.html" || a == "environmental.html" || a == "advertisement.html") {
        arr[0].className = "active"
    } else if (a == "productLine.html" || a == "confirmIndent.html") {
        arr[1].className = "active"
    } else if (a == "case.html" || a == "Case-details.html") {
        arr[2].className = "active"
    } else if (a == "platform.html") {
        arr[3].className = "active"
    }


})
/*左边导航栏*/
function leftnav() {
    $(".content").find("ul").attr("class", "leftnav");
    var index = $(this).index();
    var arr = [];
    var li = $(".leftnav li a");
    for (i = 0; i < li.length; i++) {
        arr.push($(".leftnav li a")[i])
    }
    var addr = window.location.pathname;
    var i = addr.lastIndexOf("/");
    var a = addr.substr(i + 1);
    //console.log(a)
    if (a == "mydata.html" || a == "editing.html" || a == "phoneNumber.html") {
        arr[0].className = "defaultSetting"
    } else if (a == "myCollect.html" || a == "collectDetails.html") {
        arr[1].className = "defaultSetting"
    } else if (a == "myIndent.html" || a == "indentDetails.html") {
        arr[2].className = "defaultSetting"
    } else if (a == "newPassword.html") {
        arr[3].className = "defaultSetting"
    } else if (a == "feedback.html") {
        arr[4].className = "defaultSetting"
    }
}
//判断 用户是否登录
function islogin() {
    var userName = window.sessionStorage.getItem("userName")
    if (userName != null) {
        return true
    } else {
        return false
    }
}
$(document).ready(function () {
    if (window.sessionStorage.getItem("id")) {
        $.ajax({
            url: root_path + "user/findUserDetail",
            type: 'post',
            async: false,
            data: {
                id: window.sessionStorage.getItem("id"),
            },
            success: function (result) {
                if (result.code == 1) {
                    /*照片是否加载*/
                    if (result.object.photo == undefined) {
                        /*是否是首页*/
                        if (window.location.href.search("index") == -1) {
                            $(".ul1 li").find("img").attr("src", "../images/index/touxiang.png");
                        } else {
                            $(".ul1 li").find("img").attr("src", "images/index/touxiang.png");
                        }
                    } else {
                        $(".ul1 li").find("img").attr("src", image_path + result.object.photo)
                    }
                }else{
                    alert("数据加载失败")
                }
            },
            error:function(){
                alert("服务器异常，稍后重试")
            }
        })
        $(".ul1>li:last>a").text("退出")
    } else {
        if ((window.location.href.search("index")) != -1) {
            $(".ul1>li:first").html("<a href='pages/register.html' style='margin-right:20px;font-size:15px;color: #fff;'>注册</a>")
        } else {
            $(".ul1>li:first").html("<a href='register.html' style='margin-right:20px;font-size:15px;color: #fff;'>注册</a>")
        }
        $(".ul1>li:last>a").text("登录")
    }

    /*文本是登录页面的时候*/
    if ($(".ul1>li:last>a").text() == "登录") {
        $(document).on("click", ".ul1>li:last>a", function (e) {
            e.preventDefault()
            var from = window.location.href;
            if (from.search("pages") == -1) {
                RedirectUrl("pages/login.html");
            } else {
                var index = from.indexOf("pages");
                var str = from.substr(0, index + 6);
                var Url = str + "login.html?from=" + from;
                RedirectUrl(Url);
            }
        })
    }
    //退出页面
    if ($(".ul1>li:last>a").text() == "退出") {
        $(document).on("click", ".ul1>li:last>a", function () {
            /*清除session数据*/
            window.sessionStorage.clear();
        })
    }
    /*产品系列页面退出*/
    $(document).on("click", ".tuichu", function () {
        if ($(".tuichu").text() == "退出") {
            /*清除session数据*/
            window.sessionStorage.clear();
        }
    })
})
//判断高度
//window.onload = function () {
//    var clientHeight =
//        document.documentElement.clientHeight || document.body.clientHeight;
//    var aa = $(".head").height() + $(".nav").height() + $(".bottom-box").height();
//    var dd = clientHeight - aa;
//    var top = clientHeight - $(".bottom-box").height();
//    var contentHeight = $(".content").height();
//    if (contentHeight < dd) {
//        $(".bottom-box").css({
//            "position": "absolute",
//            "top": top,
//            "left": 0
//        })
//    } else {
//        $(".bottom-box").css({
//            "position": "static"
//        })
//    }
//}
//返回图片路径
$.views.converters("getImagePath", function (url) {
    return image_path + url;
});
//禁止选中
document.onselectstart = function () {
    return false;
}

//分页事件例子
$('#displayPage').on('click', '.pagination', function () {
    var activeFlag = $(this).hasClass("active");
    var disableFlag = $(this).hasClass("disabled");
    if (!activeFlag && !disableFlag) {
        var nextPage = $(this).attr("thispage");
        $("#_click_page").val(nextPage);
        //重新加载列表
    }
});
$(document).ready(function () {
    var username = window.sessionStorage.getItem("userName");
    if (username == "undefined") {
        $("#username").text("")
    }
})
function dd(){
    var price = $(".price")
    for(var i=0;i<=price.length;i++) {
        var s=$(price[i]).text();
        s = s.replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
            s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        $(price[i]).text("￥"+s);
    }
}
