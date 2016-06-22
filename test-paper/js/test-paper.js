/**
 * Created by Administrator on 2016/5/6.
 */
var timeCon = $('.countdown-time');
$(function () {
    diffDay('2016/6/7');//倒计时
    goNav();//导航
    goTop();//返回顶部
//复选框
    $('label[for=show-answer]').on('click', function () {
        var _this=$(this);
        checkbox(_this);
    });
    $('label[for=select-all]').on('click', function () {
        var _this=$(this);
        checkbox(_this);
    });
});
/*头部下拉*/
var nav=$('.hd-subnav');
nav.on('mouseenter',function(){
    $(this).find('.sld-area').stop().slideDown(100);
});
nav.on('mouseleave',function(){
    $(this).find('.sld-area').stop().slideUp(100);
});
function diffDay(target) {
    var todyTime = new Date();
    var targetTime = new Date(target);
    var diffTime = targetTime - todyTime;
    var diffDay = 0;
    if (diffTime > 0) {
        diffDay = parseInt(diffTime / 1000 / 3600 / 24);
        if (diffDay <= 1000) {
            timeCon.find('.first').html(parseInt(diffDay / 100));
            timeCon.find('.second').html(parseInt((diffDay / 10) % 10));
            timeCon.find('.third').html(parseInt((diffDay % 100) % 10));
        }
    }
    else {
        timeCon.html('高考过了');
    }
}

/*导航跳转*/
function goNav() {
    $('.nav-link a').on('click', function () {
        var _this = $(this);
        linkSkip(_this);
    });
    $('.box-list a').on('click', function () {
        var _this = $(this);
        linkSkip(_this);
    });
}
function linkSkip(_this) {
    var $objId = _this.attr('href');
    _this.addClass('active').parent('li').siblings('li').find('a').removeClass('active');
    var $he = $($objId).offset().top;
    $('html,body').animate({scrollTop: $he +0}, 800);
    return false;
}
/*返回顶部*/
var $goTop = $('.go-top');
$(window).on('resize', function () {
    if ($(window).width() < 1400) {
        $goTop.css('right', '10px');
    }

});
function goTop() {
    $goTop.on('click', function () {
        $('html,body').animate({scrollTop: 0}, 800);
    });
}
function checkbox(that) {
    var obj = that.attr('for');
    if (!$('#' + obj).prop('checked')) {
        that.addClass('click');
    }
    else {
       that.removeClass('click');
    }
}

