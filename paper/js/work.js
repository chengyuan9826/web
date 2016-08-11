/**
 * Created by Administrator on 2016/8/2.
 */
$(function(){
    showHd();
    lookAnalytic($('.look-analytic .btn'));
    selectAnswer();
    setRadioId();
    setRadioName($('.answer-list'));
    slide($('.slide'),$('.paper-tit .num'));
   /* var myScroll=new IScroll('.slide-item');
    var mScroll=new IScroll('.scroll-wrap');
    new IScroll('.scroll-wrap1');*/
});

/*做题页面头部点击更多按钮*/
function showHd(){
    var on=true;
    $('.side-icon').on('click',function(){
        if(on){
            $(this).next('.side-nav').show();
            on=false;
        }else{
            $(this).next('.side-nav').hide();
            on=true;
        }
    });
    /*收藏学校*/
    $('.side-nav .col-icon').on('click',function(){
        $(this).parents('.side-nav').hide();
        on=true;
    });
    /*收藏试卷*/
    $('.side-nav .ck-icon').on('click',function(){
        $(this).parents('.side-nav').hide();
        on=true;
    });
}

/*查看解析*/
function lookAnalytic(btn){
    btn.on('click',function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).parents('.question-analytic').find('.analysis_info').hide();
        }
        else{
            $(this).addClass('active');
            $(this).parents('.question-analytic').find('.analysis_info').show();
        }
    });
}

/*滑动加载下一题*/
function slide(ul,numBox){
    var len=ul.children().length;
    var current=0;
    var itemWidth=$(window).width();
    var ht=$(window).height()-$('.paper-tit').height()-$('header').height();
    /*设置side-wrap的高度*/
    ul.width(len*itemWidth);
    ul.children().width(itemWidth);

    ul.children().on('swipeLeft',function(){
            if(current<len-1){
                ul.animate({left:-(current+1)*itemWidth});
                current++;
                numBox.find('.current').text(current+1);
            }
            else{
                layer.open({
                    title: '提示',
                    content: '练习做完了，查看练习结果？',
                    btn: ['查看', '取消'],
                    yes: function(index){
                        window.location='test-result.html';
                        layer.close(index);
                    }
                });
            }
    });
    ul.children().on('swipeRight',function(){
        if(current>0){
            ul.animate({left:-(current-1)*itemWidth});
            current--;
            numBox.find('.current').text(current+1);
        }
        else{
            layer.open({
                title: '提示',
                content: '这已经是第一题！'
            });
        }
    });
}

/*显示当前题目个数以及当前题号*/
function currentAndSum(ul){
    var sum= ul.children().length;
    var current=parseInt($('.aside_section.current').index())+1;
    $('.num .sum').text(sum);
    $('.num .current').text(current);
}

/*获取选择的答案*/
function Answer(list){
    this.result=[];
    this.list=list;
    return this.getValue();
}
Answer.prototype.getValue=function(){
    var _this=this;
    $.each(_this.list.find('input'),function(index,val){
        if($(val).prop('checked')){
            var txt=$(val).siblings('label').find('i').text();
            _this.result.push(txt);
        }
    });
    return _this.result;
};

/*做题页面选择题*/
function selectAnswer(){
    $('.answer-list label').on('click',function(){
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
