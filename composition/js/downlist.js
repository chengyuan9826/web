/**
 * Created by Administrator on 2016/6/16.
 */
$(function () {
    downList($('.show-select'));
    /*new DownList($('.show-select')[1]);*/
    /*   select();*/
});

function select() {
    $('.second-list').find('li').on('click', function () {
        var txt = $(this).text();
        $(this).parents('.s-item').find('.show-select').text(txt).removeClass('active').siblings('.down-list').slideUp();
        $('.second-list').hide();
        return false;
    });
}

function downList(obj) {
    obj.on('click', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').parent().siblings().find('.show-select').removeClass('active');
            $(this).next('.down-list').slideDown().parent().siblings().find('.down-list').slideUp();
            obj.siblings('.down-list').find('a').on('click', function () {
                if ($(this).siblings().length) {
                    $(this).siblings('.second-list').show();
                    select();
                }
                else {
                    var txt = $(this).text();
                    $(this).parents('.down-list').slideUp();
                    $('.second-list').hide();
                    $(this).parents('.s-item').find('.show-select').text(txt).removeClass('active');
                }
                return false;
            });
        }
        else {
            $(this).removeClass('active').next('.down-list').slideUp();
            $('.second-list').hide();
        }
    });
}