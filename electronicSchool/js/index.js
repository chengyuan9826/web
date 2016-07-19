/**
 * Created by Administrator on 2016/7/18.
 */
$(function(){
    downList();
    showSelect();
    showBtn();
    cancel();
});
function downList(){
    $('.show-selected').on('click',function(){
        $('.show-list').hide(500);
        $('.show-selected').removeClass('active');
        $(this).addClass('active').siblings('.show-list').show(500);
        $('.shadow').show();
    });
    $('.shadow').on('tap',function(){
        $('.show-list').hide();
        $('.show-selected').removeClass('active');
        $(this).hide();
    })
}
/*显示已选中的信息*/
function showSelect(){
    $('.show-list').find('a').on('click',function(){
        var txt=$(this).text();
        $('.show-list').find('a').removeClass('active');
        $(this).addClass('active').parents('.show-list').prev('.show-selected').removeClass('active').text(txt);
        $('.show-list').hide();
        $('.shadow').hide();
        return false;
    });
}
function showBtn(){
    $('.item-icon').on('click',function(){
        $('.wrap-shadow').show();
        $('.btn-list').animate({'bottom':'0'});
        return false;
    });
}
function cancel(){
    $('.cancel').on('tap',function(){

        $('.btn-list').animate({'bottom':'-30%'},function(){
            $('.wrap-shadow').hide();
        });

    });
}