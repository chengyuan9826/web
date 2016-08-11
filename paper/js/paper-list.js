$(function(){
    downList($('.slt-tit'), $('.shadow'));
  treeList($('.slt-list li'));
    showSelect($('.slt-area-1 .slt-list'));
   showSelect($('.slt-second-list'));
});
/*下拉菜单*/
function downList(btn, shadow) {
    btn.on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).next('ul').animate({height: '0', overflow: 'hidden'});
            $(this).removeClass('active');
            $('.shadow').hide();
        }
        else {
            btn.removeClass('active').next('ul').animate({'height': '0', overflowY: 'hidden'});
            $(this).addClass('active').next('ul').animate({'height': '30rem', overflowY: 'auto'});
            $('.shadow').show();
        }
    });
    $('.shadow').on('tap', function () {
        btn.next('ul').animate({height: '0', overflow: 'hidden'});
        btn.removeClass('active');
        $(this).hide();
    })
}
function treeList(btn){
   btn.on('click',function(){
       $(this).addClass('active').find('ul').animate({'height': '30rem', overflowY: 'auto'});
       $(this).siblings().removeClass('active').find('ul').animate({'height': '0', overflowY: 'hidden'});
   });
}
/*显示已选中的信息*/
function showSelect(list) {
    list.find('li').on('click', function () {
        var txt = $(this).text();
        list.removeClass('active');
        $(this).addClass('active').parents('ul').siblings('.slt-tit').removeClass('active').text(txt);
        list.animate({height: '0', overflow: 'hidden'});
        list.parents('.slt-list').animate({height: '0', overflow: 'hidden'});
        $('.shadow').hide();
        return false;
    });
}

/**
 * Created by Administrator on 2016/8/1.
 */
