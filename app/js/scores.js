/**
 * Created by Administrator on 2016/7/26.
 */
$(function(){
    downList($('.nav-name'));
    showSelect($('.nav-list'));
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