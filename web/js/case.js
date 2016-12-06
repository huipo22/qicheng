/**
 * Created by Administrator on 2016/4/13.
 */
//所有小区
$.ajax({
    url: root_path + "village/findVillageList",
    type: 'post',
    async: false,
    data: {
        "nextPage": nextPage,
        "pageSize": pageSize,
    },
    success: function (data) {
        if(data.code==1){
            var temp = $("#listLi-span-tmpl").render(data.object);
            $("#village-name").html(temp);
        }else{
            alert("数据加载失败")
        }
    },
    error: function () {
        alert("服务器异常，稍后重试")
    }
});
//页面加载
$(document).ready(function () {
    $('.azonic').addClass('span');
    villages(0);
    //my();

//点击各个小区
    $('#village-name').find('span').click(function () {
        //var event = window.event || arguments.callee.caller.arguments[0];
        var data_img = $(this).attr("data-img");
        //样式
        $(this).addClass('span').siblings().removeClass("span");
        $(".azonic").removeClass('span');
        $(".area").show();
        $('#village-desc').find('h1').html($(this).attr('data-name'));
        $('#village-desc').find('.address').html("地址：" + $(this).attr('data-address'));
        $('#village-desc').find('.desc').html("描述：" + $(this).attr('data-desc'));
        $('#village-desc').find('img').attr('src', data_img);
        var villId = $(this).attr("data-id");
        //my();
        area(nextPage, villId);//默认的ajax请求
        click_Vill()
        //分页里的点击事件封装
        function click_Vill() {
            $(document).on("click", ".paginationPage", function () {
                $(".hint").html("");
                var activeFlag = $(this).hasClass("active");
                var disableFlag = $(this).hasClass("disabled");
                if (!activeFlag && !disableFlag) {
                    var nextPage = $(this).attr("thispage");
                    //当前的点击页数
                    $("#_click_page").val(nextPage);
                    //area() 每次点击都要请求的ajax封装函数  villId 每个小区的id  都要传过去  一一对应
                    area(nextPage, villId);
                }
            })
            $(document).on("click", ".button", function () {
                var page = $(".input-box1").find("input").val() - 1;
                if (Number($(".input-box1").find("input").val()) == 0) {
                    area(0, villId);
                    return
                }
                if (Number($(".input-box1").find("input").val()) > $(".total_page").text()) {
                    area($(".total_page").text() - 1, villId);
                    return;
                } else {
                    area(page, villId);
                    return
                }
            })
            $(document).on("keydown", ".input-box1 input", function (e) {
                if (e.keyCode == 13) {
                    var page = $(".input-box1").find("input").val() - 1;
                    if (Number($(".input-box1").find("input").val()) == 0) {
                        area(0, villId);
                        return
                    }
                    if (Number($(".input-box1").find("input").val()) > $(".total_page").text()) {
                        area($(".total_page").text() - 1, villId);
                        return;
                    } else {
                        area(page, villId);
                        return
                    }
                }
            })
        }
    })
    function area(nextPage, areaId) {
        $.ajax({
            url: root_path + "successCase/findSuccessCaseListByAillageId",
            type: 'post',
            async: false,
            data: {
                "nextPage": nextPage,
                "pageSize": pageSize,
                "villId": areaId
            },
            success: function (data) {
                var temp = $("#listLi-ul-tmpl").render(data.object.content);
                $("#listLi-ul").html(temp);
            }
        });
    }

    if (($("#listLi-ul").html()) == "") {
        $(".house-bottom")[0].style.display = "none";
    } else {
        $(".house-bottom")[0].style.display = "block";
    }

//点击不限
    $(".azonic").click(function () {
        villages();
        PagesFun(villages)
        $(".area").hide();
        $(this).addClass('span');
        $('#village-name').find('span').removeClass('span')
        if (($("#listLi-ul").html()) == "") {
            $(".house-bottom")[0].style.display = "none";
        } else {
            $(".house-bottom")[0].style.display = "block";
        }
        //my();
    });
    function villages(nextPage) {
        $.ajax({
            url: root_path + "successCase/findSuccessCaseList",
            type: 'post',
            async: false,
            data: {
                "nextPage": nextPage || 0,
                "pageSize": pageSize,
                "cashId": $(this).attr('data-id')
            },
            success: function (data) {
                if(data.code==1){
                    var temp = $("#listLi-ul-tmpl").render(data.object.content);
                    $("#listLi-ul").html(temp);
                    if(data.object.totalPages){
                        $(".total_page").html(data.object.totalPages)
                        loadTmpl.renderExternalTemplate("page", "#displayPage", data.object);
                    }
                }else{
                    alert("数据加载失败")
                }
            },
            error:function(){
                alert("服务器异常，稍后重试")
            }
        });
    }

    PagesFun(villages);
/*    function my() {
        var clientHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
        var aa = $(".head").height() + $(".nav").height() + $(".bottom-box").height();
        var dd = clientHeight - aa;
        var top = clientHeight - $(".bottom-box").height();
        var contentHeight = $(".content").height();
        if (contentHeight < dd) {
            $(".bottom-box").css({
                "position": "absolute",
                "top": top,
                "left": 0
            })
        } else {
            $(".bottom-box").css({
                "position": "static"
            })
        }
    }*/
})






