$(function(){
    downList($('.side-icon'), $('.shadow'));
    downList($('.slt-tit'), $('.overlay'));
    showSelect($('.slt-area-list'), $('.overlay'));
});
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
        list.find('a').removeClass('active');
        $(this).addClass('active').parents('ul').prev().removeClass('active').text(txt);
        list.animate({height: '0', overflow: 'hidden'});
       shadow.hide();
        return false;
    });
}
/**
 * Created by Administrator on 2016/8/1.
 */
