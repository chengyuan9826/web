/**
 * Created by Administrator on 2016/8/2.
 */
$(function () {
    showHd();
    lookAnalytic($('.look-analytic .btn'));
    selectAnswer();
    setRadioId();
    setRadioName($('.answer-list'));
    slide($('.slide'), $('.paper-tit .num'));
    currentAndSum($('.slide'),1);

    scroll($('.slide-second-wrap'));
    scroll($('.scroll-1'));
    scroll($('.scroll'));
});
function scroll(obj){
    $.each(obj,function(index,val){
        new IScroll(obj[index]);
    });
}
/*做题页面头部点击更多按钮*/
function showHd() {
    var on = true;
    $('.side-icon').on('click', function () {
        if (on) {
            $(this).next('.side-nav').show();
            on = false;
        } else {
            $(this).next('.side-nav').hide();
            on = true;
        }
    });
    /*收藏学校*/
    $('.side-nav .col-icon').on('click', function () {
        $(this).parents('.side-nav').hide();
        on = true;
    });
    /*收藏试卷*/
    $('.side-nav .ck-icon').on('click', function () {
        $(this).parents('.side-nav').hide();
        on = true;
    });
}

/*查看解析*/
function lookAnalytic(btn) {
    btn.on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parents('.look-analytic').next('.analysis').hide();
        }
        else {
            $(this).addClass('active');
            $(this).parents('.look-analytic').next('.analysis').show();
        }
        scroll($('.scroll-1'));
    });
}

/*滑动加载下一题*/
function slide(ul) {
    $('.slide-wrap').height($(window).height()-$('.header').height()-$('.paper-tit').height());
    slider(ul);
    slider($('.second-wrap'));
}
/*slider*/
function slider(ul){
    ul.each(function(id,val) {
        var len = $(val).children().length;
        var wd = $(window).width();
        var parentLen=$(val).parents('ul').children().length;
        var parentIndex=$(val).parents('li').index();
        $(val).width(len * wd);
        $(val).children().width(wd);

        $(val).children().on('swipeRight', function (e) {
            e.preventDefault();
            var index = $(this).index();
            if (index > 0) {
                $(this).parent().animate({left: -(index - 1) * wd});
            }
            else{
                if($(val).parents('li').length>0 && parentIndex>0){
                    $(val).parents('ul').animate({left: -(parentIndex-1) * wd});
                }
            }
            e.stopPropagation();
        });
        $(val).children().on('swipeLeft', function (e) {
            e.preventDefault();
            var index = $(this).index();
            if (index <len-1) {
                $(this).parent().animate({left: -(index+1) * wd});
            }
            else{
                if($(val).parents('li').length>0 && parentIndex<parentLen-1){
                   $(val).parents('ul').animate({left: -(parentIndex+1) * wd});
                }
            }
            currentAndSum($('.slide'),parentIndex);
            e.stopPropagation();
        });
    });
    function autoSlide(ul,index){
        ul.each(function(id,val) {
            e.preventDefault();
            var len = $(val).children().length;
            var wd = $(this).width();
            if (index <len-1) {
                $(this).parent().animate({left: -(index+1) * wd});
                index++;
            }
            e.stopPropagation();
        });
    }
}
/*显示当前题目个数以及当前题号*/
function currentAndSum(ul,index) {
    var sum = ul.children().length;
    var current = index;
    $('.num .sum').text(sum);
    $('.num .current').text(current);
}

/*获取选择的答案*/
function Answer(list) {
    this.result = [];
    this.list = list;
    return this.getValue();
}
Answer.prototype.getValue = function () {
    var _this = this;
    $.each(_this.list.find('input'), function (index, val) {
        if ($(val).prop('checked')) {
            var txt = $(val).siblings('label').find('i').text();
            _this.result.push(txt);
        }
    });
    return _this.result;
};

/*做题页面选择题*/
function selectAnswer() {
    $('.answer-list label').on('click', function () {
        $(this).addClass('active').parents().siblings().find('label').removeClass('active');
    });
}

/*设置radio的name值*/
function setRadioName(obj) {
    obj.each(function (index, val) {
        $(val).find('input[type=radio]').attr('name', 'radio' + index);
    });
}

/*设置radio 的id*/
function setRadioId() {
    var radioList = $('input[type=radio]');
    var arr = randomNum(radioList.length);
    $.each(radioList, function (index, val) {
        $(val).attr('id', 'radio' + arr[index]);
        $(val).siblings('label').attr('for', 'radio' + arr[index]);
    });
}

/*生成不重复随机数*/
function randomNum(len) {
    var idList = [];
    for (var i = 0; i < len; i++) {
        idList[i] = parseInt(Math.random() * len);
        for (var j = 0; j < i; j++) {
            if (idList[i] == idList[j]) {
                i--;
                break;
            }
        }
    }
    return idList;
}