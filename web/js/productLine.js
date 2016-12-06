var selarr1 = [];//场景切换时，还可以选中
//填充风雅颂
$(document).ready(function () {
    $.ajax({
        url: root_path + "productSeries/findProductSeriesList",
        type: 'post',
        data: {
            userId: window.sessionStorage.getItem("id"),
        },
        async: false,
        success: function (data) {
            if (data.code == 1) {
                var result = data.object
                if (result) {
                    var ms = $("#title").render(result);
                    $(".fengyasong").html(ms);
                } else {
                    $(".fengyasong").html("");
                }
            } else {
                alert("数据加载失败")
            }
        },
        error:function(){
            alert("服务器异常，稍后重试")
        }
    })
    if ($(".fengyasong>li")) {
        if (window.location.href.search("id") == -1) {
            var proid = $(".fengyasong>li:first")[0].getAttribute("data-id")
            jiazaiyemian(proid)
            showunder(proid)
            $(".fengyasong>li:first").attr("class", "active1")
            $("#changjing>li:first").attr("class", "active2")
            $(".updata>li:first").attr("class", "active3")
        } else {
            var proid = window.location.href.substr(window.location.href.lastIndexOf("=") + 1)
            jiazaiyemian(proid)
            showunder(proid)
            $(".fengyasong>li[data-id=" + proid + "]").attr("class", "active1")
            $("#changjing>li:first").attr("class", "active2")
            $(".updata>li:first").attr("class", "active3")
        }
    }
    //AreaFrame()
})
//下面所有内容填充
function jiazaiyemian(proid) {
    $.ajax({
        url: root_path + "productSeries/findProductSeriesList",
        type: 'post',
        data: {
            userId: window.sessionStorage.getItem("id"),
            proId: proid
        },
        async: false,
        success: function (data) {
            var result = data.object
            if (result) {
                if (result) {
                    var sm = $("#bgmodel").render(result[0]);//填充下面内容
                    $(".feng").html(sm);
                } else {
                    $(".feng").html("");
                }
                if (result[0]) {
                    var b = $("#chagnjingjiazai").render(result[0]);     //场景加载
                    $("#changjing").html(b);
                } else {
                    $("#changjing").html("");
                }
                if (result[0].sceneVoList) {
                    var a = $("#uper").render(result[0].sceneVoList[0]);     //填充升级包内容
                    $(".updata").html(a);
                } else {
                    $(".updata").html("");
                }
                if (result[0].sceneVoList) {
                    if (result[0].sceneVoList[0].upgradeList[0]) {
                        var c = $("#upersmallpicture").render(result[0].sceneVoList[0].upgradeList[0]); //升级包图片加载
                        $(".he").html(c)
                    } else {
                        $(".he").html("")
                    }
                } else {
                    $(".he").html("")
                }
            }
        }
    })
}
$(document).ready(function () {
    window.sessionStorage.removeItem("upgradeid");
    if (window.sessionStorage.getItem("id")) {
        $(".tuichu").text("退出")
    } else {
        $(".tuichu").text("登录")
    }
    if (islogin()) {
        $(".div1").hide();
        $(".div2").show();
    } else {
        $(".div1").show();
        $(".div2").hide();
    }
    var qq = $(".img-box");
    $(document).on("click", ".fengyasong>li", function () {
        var isCol = $(".active1").attr("data-ishistory");
        if (Number(isCol) == 0 || isCol == undefined) {
            $(".collects>img").attr("src", "../images/product/shoucang02.png");
        } else {
            $(".collects>img").attr("src", "../images/product/shoucang01.png");
        }
        var proid = $(this).attr("data-id");
        $.ajax({
            url: root_path + "productSeries/findProductSeriesList",
            type: 'post',
            data: {
                userId: window.sessionStorage.getItem("id"),
                proId: proid
            },
            async: false,
            success: function (data) {
                var result = data.object
                if (result[0]) {
                    var sm = $("#bgmodel").render(result[0]);//填充下面内容
                    $(".feng").html(sm);
                } else {
                    $(".feng").html("");
                }
                if (result[0]) {
                    var b = $("#chagnjingjiazai").render(result[0]);     //场景加载
                    $("#changjing").html(b);
                } else {
                    $("#changjing").html("");
                }
                if (result[0].sceneVoList) {
                    var a = $("#uper").render(result[0].sceneVoList[0]);     //填充升级包内容
                    $(".updata").html(a);
                } else {
                    $(".updata").html("<div>升级包</div>");
                }
                if (result[0].sceneVoList) {
                    if (result[0].sceneVoList[0].upgradeList != "") {
                        var c = $("#upersmallpicture").render(result[0].sceneVoList[0].upgradeList[0]); //升级包图片加载
                        $(".he").html(c)
                    } else {
                        $(".he").html("")
                    }
                }
                showunder(proid)
                hw();
                click();
                showpicture()
                sel();
                price()
            }
        })


        $(".fengyasong>li").attr("class", "")
        $(this).attr("class", "active1")
        $("#changjing>li:first").attr("class", "active2")
        $(".updata>li:first").attr("class", "active3")
    })
    function click(){
        $("#changjing li").click(function(){
            uperarr = [];
            //var event = window.event || arguments.callee.caller.arguments[0];
            $("#changjing>li").attr("class", "")
            $(this).attr("class", "active2");
            $("#bgpicture")[0].src = image_path + $("#changjing>li[class=active2]").attr("data-img");
            var sceneId = $("#changjing>li[class=active2]").attr("data-sceneid")
            var proId = $(".fengyasong>li[class=active1]").attr("data-id")
            $.ajax({
                url: root_path + "productSeries/findProductSeriesList",
                type: 'post',
                data: {
                    userId: window.sessionStorage.getItem("id"),
                    proId: proId,
                    sceneId: sceneId
                },
                //dataType:"json",
                async: false,
                success: function (data) {
                    var result = data.object;
                    if (result[0].sceneVoList[0]) {
                        var a = $("#uper").render(result[0].sceneVoList[0]);     //填充升级包内容
                        $(".updata").html(a);
                    } else {
                        $(".updata").html("");
                    }
                    if (result[0].sceneVoList[0].upgradeList != "") {
                        var c = $("#upersmallpicture").render(result[0].sceneVoList[0].upgradeList[0]); //升级包图片加载
                        $(".he").html(c)
                        selsure()
                    } else {
                        $(".he").html("")
                    }
                }
            })
            $(".updata>li:first").attr("class", "active3");
            showpicture();
            sel();
            price()
        })
    }
    click() ;
    showpicture();
    sel();
    price()
})
function price(){
    $(".img").hover(function(){
        $(this).next().next().toggleClass("hidens")
    })
}
function showpicture() {
    $(".updata li").click(function(){
        $(".he")[0].style.marginTop = "0px"
        $(".updata li").attr("class", "")
        $(this).attr("class", "active3")
        var sceneId = $("#changjing>li[class=active2]").attr("data-sceneid");
        var proId = $(".fengyasong>li[class=active1]").attr("data-id")
        var upgradeId = $(".updata li[class=active3]").attr("data-upgradeid")
        $.ajax({
            url: root_path + "productSeries/findProductSeriesList",
            type: 'post',
            data: {
                userId: window.sessionStorage.getItem("id"),
                proId: proId,
                sceneId: sceneId,
                upgradeId: upgradeId
            },
            async: false,
            success: function (data) {
                var result = data.object[0].sceneVoList[0].upgradeList[0]
                var c = $("#upersmallpicture").render(result)
                $(".he").html(c)
                selsure()
                sel();
            }
        })
        price();
    })
}
/*function hideprice() {
    var event = window.event || arguments.callee.caller.arguments[0];
    var ele = event.target || event.srcElement;
    $(ele).next().next().css({
        "display": "none"
    })
}
function showprice() {
    var event = window.event || arguments.callee.caller.arguments[0];
    var ele = event.target || event.srcElement;
    $(ele).next().next().css({
        "display": "block"
    })
}*/
var arr111 = [];
function showunder(proid) {
    var userId = window.sessionStorage.getItem("id");
    var proId = $(".fengyasong>li[class=active1]").attr("data-index")
    if (islogin()) {
        $.ajax({
            url: root_path + "productSeries/findProductSeriesList",
            type: 'post',
            async: false,
            data: {
                userId: userId,
                proId: proid
            },
            success: function (data) {
                var result = data.object[0];
                if (result) {
                    var sm = $("#chanpin").render(result);
                    $(".div2").html(sm);
                } else {
                    $(".div2").html("");
                }
            }
        });
    }
}
function choseuper(obj) {
    upgradeImg(obj);//换肤调用
}
var upgradeid = [];
var uperarr = []
var key;
var prices = [];//一个场景下的升级包价格；
var scenes = [];//所有升级包总价；
var hasarr = [];
$("body").on("click", "img", function () {

})

function sel() {
    $(".shade img").click(function(e){
        e.stopPropagation();
        selsure();
        var has = $("#changjing li[class=active2]").attr("data-index");

        if (hasarr[has]) {
            uperarr = hasarr[has];
        }
        var arr111 = [];
        var aa = $(this).attr("src");
        var i = aa.search("png");
        var url = aa.substr(0, i - 2);
        var a = $(".shade>span>img");

        for (var i = 0; i < a.length; i++) {
            a[i].src = url + "4.png";
        }
        var img = $(this).parent().parent().prev().attr("data-materid")
        for (key in selarr1) {
            if (selarr1[key] == img) {
                $(this)[0].src = url + "4.png"
            }
        }
        if ($(this)[0].src == url + "4.png") {
            $(this)[0].src = url + "3.png"
        }


        //点击图片传值
        var pri = Number($(this).parent().parent()[0].nextElementSibling.children[0].innerHTML.substr(1))
        var id = $(this).parent().parent().prev().attr("data-materid");
        var dd = $(".updata li[class=active3]").attr("data-upgradeid")
        var scene = $("#changjing>li[class=active2]").attr("data-index")
        var productSeriesId = $(".finishStyle li[class=active1]").attr("data-id");
        window.sessionStorage.setItem("productSeriesId", productSeriesId);
        if (upgradeid[dd]) {
            upgradeid[dd] = ""
        } else {
            upgradeid[dd] = id + "," + dd + "," + scene + "," + pri;
        }
        var j = ""
        for (key in upgradeid) {
            if (upgradeid[key]) {
                j += (upgradeid[key] + ";")
            }
        }
        window.sessionStorage.setItem("upgradeid", j);
        //确定升级包加载到哪个位置
        var pri = Number($(this).parent().parent()[0].nextElementSibling.children[0].innerHTML.substr(1))
        var data_materid = $(this).parent().parent().prev().attr("data-materid");
        var z = $($(this).parent().parent().prev()).context
        var c = z.parentNode.parentNode.previousElementSibling
        var imgurl = c.src;
        var itemname = c.getAttribute('data-itemname');
        var brand = c.getAttribute("data-brand");
        var modeltype = c.getAttribute('data-modeltype');
        var desc = c.getAttribute('img-itemdesc');
        var b = "";
        var now = $("#changjing>li[class=active2]").text()
        for (var i = 0; i < arr111.length; i++) {
            if (now == arr111[i]) {
                b = i + 1;
            }
        }
        var up = $(".updata>li")
        var updataname = $(".updata li[class=active3]").text();
        var p = '<div class="upgrade" style="overflow: hidden;"><div class="p-top">' + updataname + '升级包</div><div><div class="pull-left clearfix"><img src="' + imgurl + '" alt=""/></div> <div class="pull-right clearfix"> <p class="p1"><span><span>名称：' + itemname + '</span></span><span>牌品：' + brand + '</span><span>型号：' + modeltype + '</span></p> <p> <span>描述:</span> <span>' + desc + '</span> </p> </div> </div> </div>'
        var i = $(".updata>li[class=active3]").attr("data-num")
        if (uperarr[i - 1] == p) {
            var img = $(this).parent().parent().prev().attr("data-materid")
            for (key in selarr1) {
                if (selarr1[key] == img) {
                    selarr1[key] = ""
                    uperarr[i - 1] = ""
                    $(this)[0].src = url + "4.png"
                }
            }
        } else {
            uperarr[i - 1] = p
            var img = $(this).parent().parent().prev().attr("data-materid")
            var up = $(".updata li[class=active3]").attr("data-upgradeid")
            if (selarr1[up]) {
                selarr1[up] = ""
                uperarr[i - 1] = ""
            } else {
                uperarr[i - 1] = p
                selarr1[up] = img
                $(this)[0].src = url + "3.png"
            }
        }
        var arr = []
        var z = $("div[class=item]")
        for (var i = 0; i < z.length; i++) {
            arr.push($("div[class=item]")[i])
        }
        var name = $("#changjing>li[class=active2]").text();
        (function () {
            var span = $(".item>span")
            for (var i = 0; i < span.length; i++) {
                arr111.push(span[i].innerHTML)
            }
        })()
        for (var i = 0; i < arr111.length; i++) {
            if (name == arr111[i]) {
                var index = arr[i].getAttribute("data-did");
                $("div[data-did=" + index + "]+div[class*=upgrade-box]").removeClass("upgrade-box")
                $("div[data-did=" + index + "]+div[class=uperdiv]").html(uperarr.join(""))
                $("div[data-did=" + index + "]+div[class=uperdiv]").addClass("upgrade-box")
            }
        }
        hw()
        var haskey = $("#changjing li[class=active2]").attr("data-index")
        hasarr[haskey] = uperarr;
        //升级包价格计算
        if ($(this).attr("src") == url + "3.png") {
            var upindex = i = $(".updata>li[class=active3]")[0].getAttribute("data-upgradeid");
            prices[upindex] = Number(pri);
            //AreaFrame();//点击是计算升级包价格
            var area = $(".inputarea").val();
            var unitPrice = parseFloat($(".pingjunprice").text());
            var sum = 0;
            for (key in prices) {
                if (prices[key]) {
                    sum += prices[key]  //计算所有升级包总价
                }
            }
            var base;
            if (area != "" && area <= 75) {
                area = 75;
                base = parseFloat(area * unitPrice).toFixed(2);
                $(".reference").html("￥" + totalprices)
            }
            if (area != "") {
                base = parseFloat(area * unitPrice).toFixed(2);
                var totalprices = (Number(base) + sum).toFixed(2);
                s = totalprices.replace(/^(\d*)$/, "$1.");
                s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
                s = s.replace(".", ",");
                var re = /(\d)(\d{3},)/;
                while (re.test(s))
                    s = s.replace(re, "$1,$2");
                s = s.replace(/,(\d\d)$/, ".$1");
                $(".reference").html("￥" + s)
            }
        } else {
            var upindex = $(".updata>li[class=active3]")[0].getAttribute("data-upgradeid");
            //if(prices[upindex]) {
            //    prices[upindex]=0
            //}else {
            prices[upindex] = Number(0);
            //
            //AreaFrame();//点击是计算升级包价格
            var area = $(".inputarea").val();
            var unitPrice = parseFloat($(".pingjunprice").text());
            var sum = 0;
            for (key in prices) {
                if (prices[key]) {
                    sum += prices[key]  //计算所有升级包总价
                }
            }
            var base;
            if (area != "" && area <= 75) {
                area = 75;
                base = parseFloat(area * unitPrice).toFixed(2);
                $(".reference").html("￥" + totalprices)
            }
            if (area != "") {
                base = parseFloat(area * unitPrice).toFixed(2);
                var totalprices = (Number(base) + sum).toFixed(2);
                s = totalprices.replace(/^(\d*)$/, "$1.");
                s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
                s = s.replace(".", ",");
                var re = /(\d)(\d{3},)/;
                while (re.test(s))
                    s = s.replace(re, "$1,$2");
                s = s.replace(/,(\d\d)$/, ".$1");
                $(".reference").html("￥" + s)
            }
        }
    })
}
//换肤
var index = 1;
function upgradeImg(obj) {
    $(".mask").show();
    var cloneImg = $(obj).find('.img').clone();
    if (cloneImg[0]) {
        var a = cloneImg[0].getAttribute("data-imgurl")
        cloneImg[0].src = image_path + a;
        $(".mask").prepend(cloneImg).prepend($(this).parent().find('input[type="hidden"]'));
        var aa = $(".mask").children("img");
        aa[0].style.zIndex = index;
        index++;
    }
}
//价格输入框失去焦点价格计算
function AreaFrame() {
    var area = $(".inputarea").val();
    var reg = /^\d{1,3}(\.\d{1,2})?$/;
    if (reg.test(area)) {
        var unitPrice = parseFloat($(".pingjunprice").text());
        var sum = 0;
        for (key in prices) {
            if (prices[key]) {
                sum += prices[key]  //计算所有升级包总价
            }
        }
        var base;
        if (area != "" && area <= 75) {
            area = 75;
            base = parseFloat(area * unitPrice).toFixed(2);
            $(".reference").html("￥" + totalprices)
        }
        if (area != "") {
            base = parseFloat(area * unitPrice).toFixed(2);
            var totalprices = (Number(base) + sum).toFixed(2);
            s = totalprices.replace(/^(\d*)$/, "$1.");
            s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
            s = s.replace(".", ",");
            var re = /(\d)(\d{3},)/;
            while (re.test(s))
                s = s.replace(re, "$1,$2");
            s = s.replace(/,(\d\d)$/, ".$1");
            $(".reference").html("￥" + s)
        }
    } else {
        alert("请输入有效面积");
        $(".inputarea").val("");
    }
    if (area == "") {
        $(".reference").html("￥" + "0.00")
    }
}
//回车计算价格
function keyDown(e) {
    var ev = window.event || e;
//13是键盘上面固定的回车键
    if (ev.keyCode == 13) {
//你要执行的方法
        AreaFrame();
    }
}

//点击免费下单
function ordering() {
    $(".ff")[0].href = "#";
    var proId = $(".fengyasong>li[class=active1]").attr("data-id")
    window.sessionStorage.setItem("proId", proId)
    if (islogin()) {
        var area = $(".inputarea").val();
        if (area != "") {
            $(".ff")[0].href = "confirmIndent.html";
            var inputarea = $(".inputarea").val();
            var thevalue = $(".reference").text().toString().substr(0);
            var fengyasong = $(".fengyasong>li[class=active1]").text();
            var pingjunprice = $(".pingjunprice").text().toString().substr(0);
            window.sessionStorage.setItem("inputarea", inputarea);
            window.sessionStorage.setItem("thevalue", thevalue);
            window.sessionStorage.setItem("fengyasong", fengyasong);
            window.sessionStorage.setItem("pingjunprice", pingjunprice);

        } else {
            alert("请输入面积")
        }
    } else {
        $(".ff")[0].href = "#";
        alert("请您登录");
        RedirectUrl('login.html?from=' + location.href)
    }
}
var b = 312
function shang() {
    var a = parseInt($(".list-style-img").css("height"))
    var top = parseInt($(".list-style-img").css("margin-top"))
    var outer = 312
    if (a + top > outer) {
        $(".list-style-img").css({"margin-top": top - b + "px"})
    }
}
function xia() {
    if ($(".list-style-img").css("margin-top") < 0) {
        var b = 312
        $(".list-style-img").css({"margin-top": b + "px"})
        b += 312
    } else {
        $(".list-style-img").css({"margin-top": "0px"})
    }
}

//确认哪一个单选框被选中
function selsure() {
    for (key in selarr1) {
        var a = selarr1[key]
        if (a) {
            if ($("img[data-materid=" + a + "]").next().children().children()[0]) {
                $("img[data-materid=" + a + "]").next().children().children()[0].src = "../images/product/checkbox3.png"
            }
        }

    }
}

function hw() {
    var a = $(".base-box")
    for (var i = 0; i < a.length; i++) {
        if (a[i].innerHTML.indexOf("div") != -1) {
            a[i].parentElement.style.display = "block"
        } else {
            a[i].parentElement.style.display = "none"

        }
    }
    var b = $(".uperdiv")
    for (var i = 0; i < b.length; i++) {
        if (b[i].innerHTML.indexOf("div") != -1) {
            b[i].parentElement.style.display = "block"
        }
    }
}
window.onload = function he() {
    var a = $(".base-box")
    for (var i = 0; i < a.length; i++) {
        if (a[i].innerHTML.indexOf("div") != -1) {
            a[i].parentElement.style.display = "block"
        } else {
            a[i].parentElement.style.display = "none"

        }
    }
    var b = $(".uperdiv")
    for (var i = 0; i < b.length; i++) {
        if (b[i].innerHTML.indexOf("div") != -1) {
            b[i].parentElement.style.display = "block"
        }
    }
    $(".islogin").click(function (e) {
        e.preventDefault();
        RedirectUrl('login.html?from=' + location.href)
    })
    var isCol = $(".active1").attr("data-ishistory");
    if (Number(isCol) == 0 || isCol == undefined) {
        $(".collects>img").attr("src", "../images/product/shoucang02.png");
    } else {
        $(".collects>img").attr("src", "../images/product/shoucang01.png");
    }
    /*收藏*/
    $(document).on("click", ".collects", function () {
        if (islogin()) {
            /*是否收藏*/
            var collectId = $(".fengyasong li[class=active1]").attr("data-history");
            if ($(".collects>img").attr("src") == "../images/product/shoucang02.png") {
                collectId = 0
                $(".collects>img").attr("src", "../images/product/shoucang01.png")
            } else {
                $(".collects>img").attr("src", "../images/product/shoucang02.png");
                collectId = 1
            }
            $.ajax({
                url: root_path + "myhistory/updateMyhistory",
                type: 'post',
                async: false,
                data: {
                    productSeriesId: $(".active1").attr("data-id"),
                    userId: window.sessionStorage.getItem("id"),
                    isHistory: collectId
                },
                success: function (result) {
                    if (result.code == 1) {
                    } else {
                        alert(result.message)
                    }
                }
            })
        } else {
            alert("您未登录，无法收藏");
            return false;
        }
    })
}