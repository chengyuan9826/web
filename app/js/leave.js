/**
 * Created by Administrator on 2016/7/26.
 */
$(function(){
    downList($('.nav-name'));
    showSelect($('.nav-list'));
    showWindow($('.leave-btn-list .no'), $('.show-window'));
    cancel($('.reason-btn .cancel'));
    /*leave-apply.html*/
    show($('.js-item .value'));
    getValue($(".show-list li"));
});
/*点击显示下拉菜单*/
function downList(btn){
    btn.on('click',function(){
        btn.next('ul').animate({height:'0',overflow:'hidden'});
        btn.removeClass('active');
        $(this).addClass('active').next('ul').animate({'height':'12rem',overflowY:'scroll'});
        $('.shadow').show();
    });
    $('.shadow').on('tap',function(){
        btn.next('ul').animate({height:'0',overflow:'hidden'});
        btn.removeClass('active');
        $(this).hide();
    });
}

/*显示已选中的信息*/
function showSelect(list){
    list.find('a').on('click',function(){
        var txt=$(this).text();
        list.find('a').removeClass('active');
        $(this).addClass('active').parents('ul').prev().removeClass('active').text(txt);
        list.animate({height:'0',overflow:'hidden'});
        $('.shadow').hide();
        return false;
    });
}

/*显示弹出框*/
function showWindow(btn,win){
    btn.on('click',function(){
        win.animate({bottom:0},500);
        $('.shadow').show();
        return false;
    });
}
function cancel(btn){
    btn.on('tap',function(){
        $('.show-window').css({bottom:'-60%'});
        $('.shadow').hide();
    });
}
function getValue(btn){
    btn.on('click',function(){
        var txt=$(this).text();
        btn.removeClass('active');
        $(this).addClass('active');
        $(this).parents('.show-window').prev().text(txt);
        $(this).parents('.show-window').css({bottom:'-60%'});
        $('.shadow').hide();
    });
}

function show(btn){
    btn.on('click',function(){
        $(this).next('.show-window').animate({bottom:0},500);
        $('.shadow').show();
        return false;
    });
}
