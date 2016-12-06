///**
// * Created by Administrator on 2016/3/22.
// */
//
//
//$(function() {
//
//    /*----Placeholder兼容start------*/
//    var doc = document,
//        inputs = doc.getElementsByTagName('input'),
//        supportPlaceholder = 'placeholder'in doc.createElement('input'),
//
//        placeholder = function (input) {
//            var text = input.getAttribute('placeholder'),
//                defaultValue = input.defaultValue;
//            if (defaultValue == '') {
//                input.value = text
//            }
//            input.onfocus = function () {
//                if (input.value === text) {
//                    this.value = ''
//                }
//            };
//            input.onblur = function () {
//                if (input.value === '') {
//                    this.value = text
//                }
//            }
//        };
//
//    if (!supportPlaceholder) {
//        for (var i = 0, len = inputs.length; i < len; i++) {
//            var input = inputs[i],
//                text = input.getAttribute('placeholder');
//            if (input.type === 'text' && text) {
//                placeholder(input)
//            }
//        }
//    }
//    /*----Placeholder兼容end------*/
//
//
//
//    //表单提交
//    $("form").submit(succeed);
//    $(".login-input").blur(function () {
//
//        var val = $(this).val();
//        if (val == "") {
//            $(".hint").text("输入信息不能为空")
//            return false;
//        }
//
//        if ($(this).is("#number")) {
//            var Telphone = $("#number").val();
//            var telphone = /^1[0-9]{10}$/;
//            var telphone_val = telphone.test(Telphone);
//            if (telphone_val == false) {
//                $(".hint").text("输入信息有误，请重新输入！")
//            }
//        }
//
//        if ($(this).is("#password")) {
//            var password = $("#password").val();
//            var Password = /^\w{6,18}$/;
//            var Password_val = Password.test(password);
//            if (Password_val == false) {
//                $(".hint").text("输入信息有误，请重新输入！")
//            }
//        }
//
//        if ($(this).is("#confirm")) {
//            var confirm = $("#confirm").val();
//            var Password = $("#password").val();
//            if (confirm != Password) {
//                $(".hint").text("输入信息有误，请重新输入！")
//            }
//        }
//    })
//    $(".login-input").focus(function () {
//        $(".hint").text("");
//    });
//
//})
//
//function succeed() {
//    $(".login_input").blur();
//    //console.log(1111)
//    var hint =$(".hint").html();
//    console.log(hint)
//    if (hint == "") {
//        return true;
//    } else {
//        return false;
//    }
//};


