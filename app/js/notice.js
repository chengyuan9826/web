/**
 * Created by Administrator on 2016/7/25.
 */
$(function(){
    showWindow($('.announce-link'));
    showWindow($('.have-read'));//查看阅读人员
    showWindow($('.no-read'));//查看未阅读人员
    showList();
    getValue($('.js-list li'));
    cancel($('.cancel'));
});
/*选择公告类型*/
function showWindow(btn){
    btn.on('click',function(){
        $(this).find('.show-window').animate({bottom:0},500);
        $('.shadow').show();
        return false;
    });
}
function showList(){
    $('.show-name').on('tap',function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active').next('ul').hide();
        }
        else{
            $(this).addClass('active').next('ul').show();
        }
    });
}
function getValue(btn){
    btn.on('tap',function(){
        var txt=$(this).text();
        btn.removeClass('active');
        $(this).addClass('active');
        $(this).parents('.show-window').prev('.select-type').text(txt);
        $(this).parents('.show-window').animate({bottom:'-60%'},500);
        $('.shadow').hide();
    });
}

function cancel(btn){
    btn.on('tap',function(){
        $(this).parents('.show-window').animate({bottom:'-60%'},500);
        $('.shadow').hide();
    });
}