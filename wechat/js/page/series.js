//存储拉取的产品系列数据，用于后面模板的再次填充
var seriesData; 
//当前产品系列和场景的索引值
var _thisSeriesIndex = 0,_thisSceneIndex = 0,_thisUpgradeIndex = 0;
//当前场景id
var _thisSeriesId = 0;
//存放勾选的升级包价格
var _upgrdePrices = new Array();
//存放勾选的升级包id-清单id
var _upgradeItemIds = new Array();
//场景id集合
var _thisSceneIds = new Array();
//总价
var areaPrice = 0;
//计时器
var myVar,myVar1,myVar2;

$(document).ready(function () {

    if(!getcookie('id')){
        $('#login_items').hide();
        $('.login').show();
    }else{
        $('#login_items').show();
        $('.login').hide();
    }

    //未登录点击跳转
    $('.login').find('a').click(function(){
        RedirectUrl('login.html?from=' + location.href);
        return;
    });

    var _id = GetQueryString('id');

	//风雅颂下拉菜单的显示和隐藏
    $('.ui-form-item').click(function () {
        $('.type_select').slideToggle();
        $("body").css({
            "overflow":"hidden"
        })
        $(".mask").show()
    });

    //风雅颂赋值
    $('#series').on('click','li',function () {
        $("body").css({
            "overflow":"visible"
        })
        $(".mask").hide()
        $('#series_name').html($(this).html());
        $('#series').slideUp();
        $('#series').find("li").removeClass('check_sty');
        $(this).addClass('check_sty');
        //设置索引值
        _thisSeriesIndex = $(this).index();
        //产品点击把场景和升级包id归位
        _thisSceneIndex = 0;
        _thisUpgradeIndex = 0;
        //数据填充
        fillTmpl(true,true,true,true,true,true);
        loadSetInterval(100);
    });

    //产品场景点击事件
    $('#sceneList').on('click','li',function(){
        var _this = this;
        _thisSceneIndex = $(_this).index();
        //场景点击时把升级包索引归位
        _thisUpgradeIndex = 0;
        //把所有场景图片设置成灰的
        $.each($('#sceneList').find('img'),function(){
            $(this).attr('src',$(this).attr('src').replace('1','2'));
        });
        //把所有场景图片设置成红的
        $(this).find('img').attr('src',$(this).find('img').attr('src').replace('2','1'));
        //数据重新填充
        fillTmpl(false,false,true,false,true,true);
        //图片是否选中
        $.each(_upgradeItemIds,function(i){
            $('#upgradeImgList').find('i[data-id="' + _upgradeItemIds[i].split('-')[1] + '"]').removeClass('i2').addClass('i1');
        });
        loadSetInterval(100);
    });

    //升级包名称点击事件
    $('#upgradeInfo').on('click','li',function(){
        $('#upgradeInfo').find('li').removeClass('active');
        $(this).addClass('active');
        $('#upgradeInfo').find('li').find('a').removeClass('oringe');
        $(this).find('a').addClass('oringe');
        _thisUpgradeIndex = $(this).index();
        //数据填充
        fillTmpl(false,false,false,false,false,true);
        //图片是否选中
        $.each(_upgradeItemIds,function(i){
            $('#upgradeImgList').find('i[data-id="' + _upgradeItemIds[i].split('-')[1] + '"]').removeClass('i2').addClass('i1');
        });
        loadSetInterval(100);
    });

    //升级包图片是否勾选
    $('#upgradeImgList').on('click','i',function(){
        var _index; //如果当前升级包的id在数组存在时的索引
        var _this = this;
        //查找当前升级包的id在数组是否存在，存在返回索引值
        $.each(_upgradeItemIds,function(i){
            if(_upgradeItemIds[i].split('-')[0] == $(_this).attr('data-gradeid')){
                _index = i;
                return false;
            }
        });
        //如果是勾选状态执行相应的操作
        if($(this).hasClass('i1')){
            //如果勾选则让它不勾选
            $(this).removeClass('i1').addClass('i2');
            //移除下方清单中的升级包
            $('#upgradeItemsList' + _thisSeriesId).find('li[data-id="' + $(this).attr('data-gradeid') + '"]').remove();
            //删除升级包清单数组和价格数组中对应的值
            _upgradeItemIds.splice(_index,1);
            _upgrdePrices.splice(_index,1);
            _thisSceneIds.splice(_index,1);
            //判断普通清单长度是否大于0，不大于则隐藏整个li
            if($('#maItemsList' + _thisSeriesId).find('li').length <= 0){
                $('#upgradeItemsList' + _thisSeriesId).parent().hide();
            }
            //重新计算价格
            areaPrice -= $(this).attr('data-price')/100;
            if($('#totalPrice').html() != '￥0.00'){
                $('#totalPrice').html('￥' + areaPrice.toFixed(2));
            }
        }else{
            //根据索引值判断是替换数组中的值还是新增数组值
            if(typeof(_index) != 'undefined'){
                //替换升级包清单数组和价格数组中对应的值
                _upgradeItemIds.splice(_index,1,$(this).attr('data-gradeid') + "-" + $(this).attr('data-id'));
                areaPrice -= _upgrdePrices[_index];
                _upgrdePrices.splice(_index,1,$(this).attr('data-price')/100);
                _thisSceneIds.splice(_index,1,$(this).attr('data-senceid'));
                //找到目前存在的升级包信息后替换原来的值
                var _li = $('#upgradeItemsList' + _thisSeriesId).find('li[data-id="' + $(this).attr('data-gradeid') + '"]');
                var _upgradeName = $('#upgradeInfo').find('.active').find('a').html();
                $(_li).attr('data-id',$(this).attr('data-gradeid'));
                $(_li).find('h4').html(_upgradeName + "升级包");
                $(_li).find('img').attr('src',$(this).attr('data-img'));
                $(_li).find('.list-unstyled').find('li').eq(0).html('名称：'+$(this).attr('data-name'));
                $(_li).find('.list-unstyled').find('li').eq(1).html('品牌：'+$(this).attr('data-brand'));
                $(_li).find('.list-unstyled').find('li').eq(2).html('型号：'+$(this).attr('data-type'));
                $(_li).find('.border_bottom_dished').html($(this).attr('data-desc'));
                //重新计算价格
                areaPrice += $(this).attr('data-price')/100;
                if($('#totalPrice').html() != '￥0.00'){
                    $('#totalPrice').html('￥' + areaPrice.toFixed(2));
                }
            }else{
                //向升级包清单数组和价格数组中加入元素值
                _upgradeItemIds.push($(this).attr('data-gradeid') + "-" + $(this).attr('data-id'));
                _upgrdePrices.push($(this).attr('data-price')/100);
                _thisSceneIds.push($(this).attr('data-senceid'));
                //把勾选的升级包填充到下面对应的场景清单列表
                var _upgradeName = $('#upgradeInfo').find('.active').find('a').html();
                var _html = '<li data-id="' + $(this).attr('data-gradeid') + '"><div class="exp"><h4>' + _upgradeName + '升级包</h4><div class="media"><div class="media-left"><a href="#"><img src="' + $(this).attr('data-img') + '" alt="" style="width:14rem;height:11rem;"/></a></div><div class="media-body"><ul class="list-unstyled"><li>名称：' + $(this).attr('data-name') + '</li><li>品牌：' + $(this).attr('data-brand') + '</li><li>型号：' + $(this).attr('data-type') + '</li></ul></div></div><p class="border_bottom_dished">描述：' + $(this).attr('data-desc') + '</p></div></li>';
                $('#upgradeItemsList' + _thisSeriesId).append(_html);
                $('#upgradeItemsList' + _thisSeriesId).parent().show();
                //重新计算价格
                areaPrice += $(this).attr('data-price')/100;
                if($('#totalPrice').html() != '￥0.00'){
                    $('#totalPrice').html('￥' + areaPrice.toFixed(2));
                }
            }
            //改变样式
            $('#upgradeImgList').find('i').removeClass('i1').addClass('i2');
            $(this).removeClass('i2').addClass('i1');
        }

    });

    $('.ui-loading-block').show();
    //产品系列数据拉取
    $.ajax({
        url: root_path+"productSeries/findProductSeriesList",
        type: 'post',
        data: {  
            "userId" : getcookie('id')
        },
        success: function(result) {
            $('.ui-loading-block').hide();
            if(result.code == 1){
                //拉取的数据结果存放于seriesData对象中，以便下次使用
                seriesData = result.object;
                console.log(seriesData);
                $.each(seriesData,function(index){
                    if(this.id == _id){
                        _thisSeriesIndex = index;
                        return false;
                    }
                });
                //加载产品系列数据
                loadData('#series','#seriesTmpl',seriesData);
                $('#series').find("li").removeClass('check_sty');
                $('#series').find("li").eq(_thisSeriesIndex).addClass('check_sty');
                fillTmpl(true,true,true,true,true,true);
            }else{
                showTips(result.message || tipMessage.undefined_msg);
            }
        },
        error: function(){
            $('.ui-loading-block').hide();
            showTips(tipMessage.error_msg);
        }
    });

    //价格输入计算
    $('#area').blur(function(){
        $('#totalPrice').html('￥0.00');
        var reg = new RegExp(/^(\d{1,6}|\d{1,6}\.\d{1,2})$/);
        var _value = $(this).val();
        if(_value && !reg.test(_value)){
            showTips('住房面积无效!');
            $(this).focus();
            return;
        }
        //获取单价计算价格
        var price = $('#seriesPrice').html();
        if(_value){
            if(_value > 75){
                areaPrice = price * _value;
            }else{
                areaPrice = price * 75;
            }
        }else{
            areaPrice = price * 0;
        }
        $.each(_upgrdePrices,function(){
            areaPrice += this;
        });
        $('#totalPrice').html('￥' + areaPrice.toFixed(2));
    });

    //提交订单
    $('#submit_order').click(function(){
        if(!$('#area').val()){
            showTips('请输入住房面积!');
            $('#area').focus();
            return;
        }
        var reg = new RegExp(/^(\d{1,6}|\d{1,6}\.\d{1,2})$/);
        var _value = $('#area').val();
        if(_value && !reg.test(_value)){
            showTips('住房面积无效!');
            $('#area').focus();
            return;
        }
        RedirectUrl(turn_path + 'confirm-order.html?seriesId=' + $('#series_id').val() 
            + '&upgradeItemId=' + _upgradeItemIds.join(',') + 
            '&upgrdePrice=' + _upgrdePrices.join(',') + "&area=" + $('#area').val() +
            '&totalPrice=' + areaPrice.toFixed(2) + "&sceneId=" + _thisSceneIds.join(','));
    });

    //收藏点击
    $('#sceneImg').on('click','#history_btn',function(){
        if(!getcookie('id')){
            showTips("请登录后再收藏！");
            return
        }
        var isHistory = 0;
        if($(this).attr('src') == '../img/series/history2.png'){
            isHistory = 1;
        }
        var _this = this;
        disabled_btn(_this);
        $.ajax({
            url: root_path + "myhistory/updateMyhistory",
            type: 'post',
            data: {  
                "productSeriesId" : $('#series_id').val(),
                "userId" : getcookie('id'),
                "isHistory" : isHistory
            },
            success: function(result) {
                active_btn(_this);
                if(result.code == 1){
                    if(isHistory == 0){
                        showTips("收藏成功！");
                        $(_this).attr('src','../img/series/history2.png');
                        seriesData[_thisSeriesIndex].isHistory = 1;
                    }else{
                        showTips("取消收藏成功！");
                        $(_this).attr('src','../img/series/history.png');
                        seriesData[_thisSeriesIndex].isHistory = 0;
                    }
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

    //图片点击换肤
    $('#upgradeImgList').on('click','img',function(){
        var _gradeid;
        var _this = this;
        $.each($('#sceneImg').find('.abs_img'),function(){
            if($(this).attr('data-gradeid') == $(_this).attr('data-gradeid')){
                _gradeid = $(this).attr('data-gradeid');
                return false;
            }
        });
        if(typeof(_gradeid) != 'undefined'){
            $('#sceneImg').find('.abs_img[data-gradeid="' + _gradeid + '"]').attr('src',$(_this).attr('data-show')).attr('data-gradeid',$(_this).attr('data-gradeid'));
        }else{
            var _imgHtml = "<img src='" + $(this).attr('data-show') + "' class='abs_img' data-upgradeid='" + $(this).attr('data-gradeid') + "'>";
            $('#sceneImg').append(_imgHtml);
        }
    });

    loadSetInterval(500);
    
});

function loadSetInterval(time){
    myVar = setInterval('set_scroll_scene();',time);
    myVar1 = setInterval('set_scroll_Img();',time);
    myVar2 = setInterval('set_scroll_upgrade();',time);
}

//场景滚动加载
function set_scroll_scene(){
    if($('#sceneList').find('li').length > 0){
        $('#senceShare').show();
        var scroll_scene = new fz.Scroll('.ui-scroller-scene', {
            scrollX: true,
            scrollY: false
        });
        clearTimeout(myVar);
    }else{
        $('#senceShare').hide();
    }
}

//升级包图滚动加载
function set_scroll_Img(){
    if($('#upgradeImgList').find('li').length > 0){
        var scroll_Img = new fz.Scroll('.ui-scroller-img', {
            scrollX: true,
            scrollY: false
        });
        clearTimeout(myVar1);
    }
}

//升级包滚动加载
function set_scroll_upgrade(){
    if($('#upgradeInfo').find('li').length > 0){
        var scroll_info = new fz.Scroll('.ui-scroller', {
            scrollX: true,
            scrollY: false
        });
        clearTimeout(myVar2);
    }
}