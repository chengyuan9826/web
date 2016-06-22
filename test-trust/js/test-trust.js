/**
 * Created by Administrator on 2016/5/10.
 */
var avrScore = $('.average');
var sumScore = $('.js-sum');
$(function () {
    /*头部下拉*/
    var nav = $('.hd-subnav');
    nav.on('mouseenter', function () {
        $(this).find('.sld-area').stop().slideDown(100);
    });
    nav.on('mouseleave', function () {
        $(this).find('.sld-area').stop().slideUp(100);
    });
    setRadioId();
    setRadioName($('.subject-answer-list'));
    setClickStyle();
    showRightAnswer();
    showTrustResult();
    closeWindow();
    showTrustRank();
    showSingleRank();
    showTotalRank();
    deleteTrust();
    average(avrScore);
    sum(sumScore);
    trustAgain();
    copyTxt();
    clearData();
});
/*显示估分结果*/
function showTrustResult() {
    var anList = $('.subject-answer-list');
    $('.trust-btn-result').on('click', function () {
        if(validate(anList)){
            $('.pop-window').slideDown();
            $('.window-result').slideDown();
            var sTop = $('body').scrollTop();
            $(window).on('scroll', function () {
                $(this).scrollTop(sTop);
            });
        }
        return false;
    });
}

/*验证*/
function validate(obj){
        var rValue=true;
        $.each(obj, function (index,val) {
            if(!isChecked($(val))){
                $('.pop-window').slideDown();
                $('.window-warn').slideDown();
                $('.warn-text').html('<span>注意：</span>第'+(index+1)+'题尚未估分');
                $('body').animate({'scrollTop': $(val).parents('.trust-subject-item').offset().top});
                rValue=false;
                return false;
            }
        });
        return rValue;
    }

function isChecked(obj) {
    var rValue=true;
    if (obj.find('input[type=radio]').length > 0) {
        if(!obj.find('input[type=radio]:checked').length){
            rValue=false;
        }
    }
    else if(obj.find('input[type=checkbox]').length > 0){
        if(!obj.find('input[type=checkbox]:checked').length){
            rValue=false;
        }
    }
    else if(obj.find('select').length > 0){
        if(obj.find('select').val()==-1){
            rValue=false;
        }
    }
    return rValue;
}

/*再估一次*/
function trustAgain() {
    $('.trust-again').on('click', function () {
        $(window).off('scroll');
        $('.pop-window').slideUp(100);
        $('.window-result').slideUp();
        $('html body').animate({'scrollTop': 0});
    });
}

/*显示估分排名*/
function showTrustRank() {
    $('.js-rank').on('click', function () {
        if ($('.pop-window').is(':hidden')) {
            $('.pop-window').slideDown();
            $('.window-rank').slideDown();
        }
        else {
            $('.window').not('.window-rank').slideUp();
            $('.window-rank').slideDown();
        }
        var sTop = $('body').scrollTop();
        $(window).on('scroll', function () {
            $(this).scrollTop(sTop);
        });
        return false;
    });
}

/*显示单科排名*/
function showSingleRank() {
    $('.single-place button').on('click', function () {
        $('.window').not('.window-single').slideUp();
        $('.window-single').slideDown();
    });
}

/*显示总分排名*/
function showTotalRank() {
    $('.sum-place button').on('click', function () {
        $('.window').not('.window-total').slideUp();
        $('.window-total').slideDown();
    });
}

/*关闭弹出框*/
function closeWindow() {
    $('.close-btn').on('click', function () {
        $(window).off('scroll');
        $(this).parent('.window-close').parent('.window').slideUp(100).parent('.pop-window').slideUp(100);

    });
}

/*复制文本框的内容*/
function copyTxt() {
    $('.copy-btn').on('click', function () {
        $(this).siblings('.copy-text').select();
        var text = $(this).siblings('.copy-text').val();
        var clip = new ZeroClipboard.Client(); // 新建一个对象
        clip.setHandCursor(true);
        clip.setText(text); // 设置要复制的文本。
        clip.addEventListener("mouseUp", function (client) {
        });
        clip.glue("copy-btn"); // 和上一句位置不可调换
    });
}

/*提示框--是否删除当前数据*/
function clearData(){
    var obj=null;
    $('.clearData').on('click',function(){
        obj=$(this).parents('.window');
        obj.append($('.js-html').html());
        obj.find('.window-warning-txt').text('是否清空当前数据？');
        obj.find('.window-warning').slideDown();
        return false;
    });
    $('.window').on('click','.warning-yes',function(){
        $('.window-warning').slideUp(200);
        $(this).parents('.window-warning').siblings('.mind-table').find('tbody tr').remove();
        $(this).parents('.window-warning').remove();
    });
    $('.window').on('click','.warning-no',function(){
        $(this).parents('.window-warning').remove();
    });
    $('.window').on('click', '.window-warning .close-btn',function () {
        $(this).parents('.window-warning').remove();
    });
}

/*删除估分结果*/
function deleteTrust() {
    var obj=null;
    $('.js-delete').on('click', function () {
        var txt=$(this).siblings('.order').text().substring(0,2);
        obj=$(this).parents('.window');
        obj.append($('.js-html').html());
        obj.find('.window-warning-txt').text('是否删除'+txt+'的估分？');
        obj.find('.window-warning').slideDown();
        var _this=$(this);
        $('.window').on('click','.warning-yes',function(){
            $('.window-warning').slideUp(200);
            _this.parents('.item').remove();
            avrScore.text(average(avrScore));
            sum(sumScore);
            $(this).parents('.window-warning').remove();
        });
        $('.window').on('click','.warning-no',function(){
            $(this).parents('.window-warning').remove();
        });
        $('.window').on('click', '.window-warning .close-btn',function () {
            $(this).parents('.window-warning').remove();
        });

    });
    $('.js-delete-tr').on('click', function () {
        var sub=$(this).siblings('.disciplines').text();
        obj=$(this).parents('.window');
        obj.append($('.js-html').html());
        obj.find('.window-warning-txt').text('是否删除'+sub+'的估分记录？');
        obj.find('.window-warning').slideDown();
        var _this=$(this);
       $('.window').on('click','.warning-yes',function(){
            $('.window-warning').slideUp(200);
            _this.parents('tr').remove();
            $(this).parents('.window-warning').remove();
            sum(sumScore);
        });
        $('.window').on('click','.warning-no',function(){
            $('.window-warning').slideUp(200);
            $(this).parents('.window-warning').remove();
        });
        $('.window').on('click', '.window-warning .close-btn',function () {
           $('.window-warning').slideUp(100);
            $(this).parents('.window-warning').remove();
        });

    });
}

/*计算总分*/
function sum(obj) {
    var aveList = obj.parent('tr').siblings('tr').find('td.average');
    var sumS = 0;
    $.each(aveList, function (index, val) {
        sumS += parseFloat($(val).text());
    });
    obj.text(sumS);
}

/*计算平均成绩*/
function average(obj) {
    $.each(obj, function (index, val) {
        var scoreList = $(val).prev('.trust-list').find('.js-score');
        var num = 0;
        var sum = 0;
        $.each(scoreList, function (id, value) {
            var score = parseFloat($(value).text());
            if (score != 0) {
                num += 1;
                sum += score;
            }
        });
        $(val).text(sum / (num ? num : 1));
    });
}

/*显示答案*/
function showRightAnswer() {
    var btn = $.each($('.subject-btn'), function (index, val) {
        var off = true;
        $(val).on('click', function () {
            if (off) {
                $(this).text('隐藏答案').addClass('active').parents('.trust-subject-item').find('.subject-answer').slideDown();
                off = false;
            }
            else {
                $(this).text('显示答案').removeClass('active').parents('.trust-subject-item').find('.subject-answer').slideUp();
                off = true;
            }
            return false;
        });
    });
}

/*设置radio的选中样式*/
function setClickStyle() {
    $('input[type=radio]').on('click', function () {
        if ($(this).is(':checked')) {
            $(this).siblings('label').addClass('active').parent('li').siblings('li').find('label').removeClass('active');
            $(this).attr('checked',true).parent('li').siblings('li').find('input[type=radio]').attr('checked',false);
        }
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


