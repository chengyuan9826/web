/**
 * Created by Administrator on 2016/7/22.
 */
$(function(){
    showWindow( $('.object-btn'));
    showList();
    cancel($('.cancel'));
    getValue($('.js-students li'));
    getValue($('.virtue-grade .show-list li'));
    selectDimension($('.dimension-list label'));

});
var num=0;
/*选择日常操行*/
function showWindow(btn){
   btn.on('click',function(){
       $(this).parents('.object-item').next('.show-window').show();
       $('.shadow').show();
       return false;
   });
}
function showList(){
    $('.show-name').on('click',function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active').next('ul').hide();
        }
        else{
            $(this).addClass('active').next('ul').show();
        }
    });
}
function getValue(btn){
    btn.on('click',function(){
        var txt=$(this).text();
        btn.removeClass('active');
        $(this).addClass('active');
        $(this).parents('.show-window').prev().find('.object-btn').text(txt);
        $(this).parents('.show-window').hide();
        $('.shadow').hide();
    });
}
function cancel(btn){
    btn.on('click',function(){
        $(this).parents('.show-window').hide();
        $('.shadow').hide();
    });
}
/*选择维度*/
function selectDimension(btn){
    btn.on('click',function(){
        var txt=$(this).find('.txt').text();
        var win= $(this).parents().siblings('.show-window');
        win.show().find('.show-title').text(txt);
        $(this).addClass('active');
        $('.shadow').show();
        getNum(win,$(this));
    });
}

function getNum(win,numIcon) {
    win.find('li').on('click', function () {
        num= $(this).text();
        $(this).addClass('active').siblings('li').removeClass('active');
        numIcon.find('.icon').text(num);
        win.hide();
        $('.shadow').hide();
    });

}
