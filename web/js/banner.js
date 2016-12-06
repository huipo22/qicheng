/**
 * Created by Administrator on 2016/3/29.
 */

$(function(){
    var lists=$("#imgUl li");
    var banner=$(".banner");
    var left=$("#pic_left");
    var right=$("#pic_right");
    var index=1;
    if(lists.length<=1){
        right.css({
            display:'none'
        })
        left.css({
            display:'none'
        });
        return;
    }else {
        function move() {
            index = (++index == lists.length ? index = 1 : index)
            aa();
        }

        function aa() {
            lists.css({display: 'none'}).eq(index).css({display: 'block'})
        }

        /*确定 index*/
        $.each(lists, function () {
            index = $(this).index();
        })
        left.click(function () {
            index--;
            if (index < 0) {
                index = lists.length - 1
            }
            aa();
        })
        right.click(function () {
            move();
        })
    }
})
