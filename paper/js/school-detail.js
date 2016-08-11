$(function(){
    //downList($('.side-icon'), $('.shadow'));
    showHd();
    downList($('.slt-tit'), $('.overlay'));
    showSelect($('.slt-area-list'), $('.overlay'));
});
/*页面头部点击更多按钮*/
function showHd(){
    var on=true;
    $('.side-icon').on('click',function(){
        if(on){
            $(this).next('.side-nav').animate({height:'8rem'});
            on=false;
        }else{
            $(this).next('.side-nav').animate({height:0});
            on=true;
        }
    });

    /*收藏试卷*/
    $('.side-nav .col-icon').on('click',function(){
        $(this).addClass('clicked').parents('.side-nav').animate({height:0});

        on=true;
    });
    /*查看学校简介*/
    $('.side-nav .ck-icon').on('click',function(){
        $(this).parents('.side-nav').animate({height:0});
        on=true;
    });
}
/*下拉菜单*/
function downList(btn, shadow) {
    btn.on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).next('ul').animate({height: '0', overflow: 'hidden'});
            $(this).removeClass('active');
            shadow.hide();
        }
        else {
            btn.removeClass('active').next('ul').animate({'height': '0', overflowY: 'hidden'});
            $(this).addClass('active').next('ul').animate({'height': '10rem', overflowY: 'auto'});
            shadow.show();
        }
    });
    shadow.on('tap', function () {
        btn.next('ul').animate({height: '0', overflow: 'hidden'});
        btn.removeClass('active');
        $(this).hide();
    })
}
/*显示已选中的信息*/
function showSelect(list,shadow) {
    list.find('li').on('click', function () {
        var txt = $(this).text();
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active').parents('ul').prev().removeClass('active').text(txt);
        list.animate({height: '0', overflow: 'hidden'});
       shadow.hide();
        return false;
    });
}
/**
 * Created by Administrator on 2016/8/1.
 */
