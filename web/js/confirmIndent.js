if(window.sessionStorage.getItem("id")){
    var area = window.sessionStorage.getItem('inputarea');
    var price =window.sessionStorage.getItem('thevalue');
    var style = window.sessionStorage.getItem('fengyasong');
    var pingjunprice = window.sessionStorage.getItem('pingjunprice');
    var uperobj = window.sessionStorage.getItem("uperobj");
    var upgradeid = window.sessionStorage.getItem('upgradeid');
    var productSeriesId = window.sessionStorage.getItem('proId');
    $('#area').html(area+"m²");
    $('#price').html(price);
    $('#style').html(style);
    var s=price.split("￥")[1];
    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    var dd=pingjunprice.split("元")[0]+"元/m²";
    $(".price").text(s);
    $('#pingjunprice').html(dd)

    var uparr=[];
    var marr=[];
    if(uparr||marr) {
        if(upgradeid) {
            var sumarr = upgradeid.split(";")
            //console.log(sumarr)
            for (var i = 0; i < sumarr.length; i++) {
                if (sumarr[i]) {
                    if (sumarr[i]) {
                        var a = sumarr[i].split(",")
                        uparr.push(a[0])
                        marr.push(a[1])
                    }
                }
            }
        }
    }
//console.log(marr.join(",")+";"+uparr.join(",")+";"+productSeriesId)
    $.ajax({
        url: root_path + "myorder/placeAnOrderDell",
        type: 'post',
        async: false,
        data: {
            "productSeriesId": productSeriesId,
            "upgradeIds":marr.join(","),
            "materialItemsIds": uparr.join(",")

        },
        success: function (data) {
            console.log(data)
            if(data.code==1){
                var result = data.object
                //console.log(data)
                if(result){
                    var temp=$("#list").render(result);
                    $(".productLine").html(temp);
                }else{
                    $(".productLine").html("");
                }
            }else{
                alert("数据加载失败")
            }
        },
        error:function(){
            alert("服务器异常，稍后重试")
        }
    });



//点击下一步传值
    function nextStep(){
        var inputarea=escape(area);
        var a=$(".nextStep")[0].href+="?inputarea="+inputarea+"&pingjunprice="+pingjunprice;
    }
}else{
    $(".myIndent").hide();
    alert("请您登录")
}

window.onload=function(){
    var nameup=$(".p-top");
    var name=$(".name")
    var strup=""
    var str=""
    for(i=0;i<nameup.length;i++) {
        if(i<name.length-1) {
            strup += ((name[i].innerHTML) + ",")
        }else{
            strup += (name[i].innerHTML)
        }
        if(i<nameup.length-1) {
            str += ((nameup[i].innerHTML) + ",")
        }else{
            str += (nameup[i].innerHTML)
        }
    }
    var s =str.split(",");
    var sp = strup.split(",");
    var strr ="";
    if(s!=""){
        for(var i=0;i< s.length;i++){
            strr+=s[i]+"-"+sp[i].split("：")[1];
            if(i!= s.length-1){
                strr+="；";
            }
        }
        $("#uptext").html(strr);
    }else{
        $("#uptext").html("");
    }

    var a = $(".base-box")
    for (var i = 0; i < a.length; i++) {
        if (a[i].innerHTML.indexOf("div") != -1) {
            a[i].parentElement.style.display = "block"
        } else {
            a[i].parentElement.style.display = "none"

        }
    }
    var b = $(".upgrade-box")
    for (var i = 0; i < b.length; i++) {
        if (b[i].innerHTML.indexOf("div") != -1) {
            b[i].parentElement.style.display = "block"
        }
    }
}


