$(function() {
    lookAnalytic($('.analysis_btn .btn'));//查看解析
    mask_circle();
    showHd();
    downList($('.hd-button .name'));//wrong-topic.html错题类型筛选
    currentAndSum();//显示当前题目总数与当前第几题
    showBigPic();//单击放大显示图片

/*   function swipers() {};
    swipers.prototype.slider = function(tagName, propo) {
        document.addEventListener('touchmove', function(event) {
            event.preventDefault();
        }, false);
        var parent = tagName.parent();
        var _len = tagName.length;
        for (var i = 0; i < _len; i++) {
            $("<a>").appendTo(parent.next());
        }
        $("a").eq(0).addClass("active");
        var imgLen = (1 / _len) * 100;
        tagName.css("width", imgLen + "%");
        parent.css("width", _len * 100 + "%");
        tagName.swipeLeft(function(event) {
            //如果是小题且是最后一个选项则不滑动本身，但是触发上一层的滑动事件
            if ($(this).parent().hasClass('small-questions') && $(this).index() == $(this).parent().children().length - 1) {
            } else {
               // event.stopPropagation();
                blt.swipe(this, 1, _len - 1, propo);
            }
        });
        tagName.swipeRight(function(event) {
            if ($(this).parent().hasClass('small-questions') && $(this).index() == 0) {
                //如果是小题且是第一个选项则不滑动本身，但是触发上一层的滑动事件
            } else {
                //event.stopPropagation();
                blt.swipe(this, -1, 0, propo);
            }
        });
    }
    swipers.prototype.swipe = function(key, value, length, propo) {

        var _len = propo.length;
        var index = $(key).index();
        var imgLen = (1 / _len) * 100;
        var len = -imgLen * (index + value) + "%";
        if (index == length) {
            return false;
        }
        $(key).parent().css({
            '-webkit-transform': 'translate(' + len + ')',
            '-moz-transform': 'translate(' + len + ')',
            'transform': 'translate(' + len + ')',
            '-webkit-transition': '500ms linear',
            '-moz-transition': '500ms linear',
            'transition': '500ms linear'
        });

        $(key).parent().children().removeClass('current');
        var $next = $(key).next();
        if (value < 0) {
            $next = $(key).prev();
        }
        $next.addClass('current');
        currentAndSum();
        if ($next.find('.small-questions').length) {
            //下一个包含小题
            var $nextQ = $next.find('.small-questions li.current');
            $nextQ = $nextQ.length ? $nextQ : value > 0 ? $next.find('.small-questions li').first() : $next.find('.small-questions li').last();
            $next.find('.small-questions li').removeClass('current');
            $nextQ.addClass('current');
            var quesid = $nextQ.attr('data-quesid');
        } else {
            var quesid = $next.attr('data-quesid');
        }

        //是大题 初始化大题题干的滚动
        if ($('.section_list .aside_section').eq(index + value).find(".more_msg").length) {
            myScroll = new IScroll($('.section_list .aside_section').eq(index + value).find(".more_msg")[0]);
        }

        if (!$(key).parent().hasClass('small-questions')) {
            //整体滚动-上面三行改为：
            if($('.section_list .aside_section').eq(index + value).find('.question_scroll').length){
                myQScroll = new IScroll($('.section_list .aside_section').eq(index + value).find('.question_scroll').parent()[0]);
            }

            //如果下一个题目是大题，则初始化小题的滑动事件
            if ($('.section_list .aside_section').eq(index + value).find(".small-questions").length) {
                var small = $('.section_list .aside_section').eq(index + value).find(".small-questions>li");
                blt.slider(small, small);
            }

        } else {
            //整体滚动-上面三行改为：
            if($(key).parent().parent().find('.small-questions>li').eq(index + value).length){
                myQScroll = new IScroll($(key).parent().parent().find('.small-questions>li').eq(index + value)[0]);
            }
        }
        return this;
    }
    //滑动切换题目
    var blt = (function() {
        return new swipers();
    })();
    //普通大题的滑动事件
    var _img = $(".section_list>section");
    blt.slider(_img, $(".section_list>section"));

    //第一个小题的滑动事件
    var smallQ = $(".small-questions>li").first().parent().children();
    blt.slider(smallQ, smallQ);

    //初始化第一个大题题干的滚动
    if ($('.section_list .aside_section .more_msg')) {
        myScroll = new IScroll(".question_title_more .more_msg");
    }
    //整体滚动-上面的三行改为：
    if ($('.section_list .aside_section')) {
        myQScroll = new IScroll(".section_list .aside_section");
    }
    //初始化题号的滚动 
   // numScroll = new IScroll(".question_order");
    //点击选项 F
    $(".aside_section").delegate('.question_choose', 'tap', function() {
        var _key = $(this).parent().parent().parent().parent().parent();
        if (_key.find('.title_type').attr("data-type") != "duo") {
            //单选
            if (_key.attr('data-parentid')) {
                //小题的切换，写到这里的我已经快奔溃了
                //看到这里我也崩溃了
                $(this).addClass("correct");
                $(this).parent().siblings("li").find(".question_choose").removeClass("correct");

                var _val = 1;
                var _leng = _key.parent().children().length;
                //特殊处理最后一个小题
                //最后一个小题，触发大题的滑动操作
                var index = _key.index();
                if (index == _leng - 1) {
                    var pkey = _key.parents('.aside_section');
                    blt.swipe(pkey, 1, pkey.parent().children().length - 1, pkey.parent().children());
                } else {
                    blt.swipe(_key, 1, _leng - 1, _key.parent().children());
                }
            } else {
                $(this).addClass("correct");
                $(this).parent().siblings("li").find(".question_choose").removeClass("correct");

                var _val = 1;
                var _leng = _img.length;
                blt.swipe(_key, 1, _leng - 1, $(".section_list>section"));
            }

        } else {
            //多选不切换题目
            if ($(this).hasClass("correct")) {
                $(this).removeClass("correct")
            } else {
                $(this).addClass("correct");

            }
        }
    });
    $('.question_order .question_choose[data-quesid="114"]').trigger("tap");*/
});

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
        myQScroll.refresh();
    });
}

function mask_circle(num) {
    if (!num) {
        var _text = num;
    } else {
        var _text = $(".mask span").text();
    }
    if (_text <= 50) {
        $(".pie_right").css("transform", "rotate(" + ($(".mask span").text() * 3.6) + "deg)");
    } else {
        $(".pie_right").css("transform", "rotate(180deg)");
        $(".pie_left").css("transform", "rotate(" + (($(".mask span").text() - 50) * 3.6) + "deg)");
    }
}

/*homework_online头部下拉菜单展示*/
function showHd(){
    var on=true;
    $('.side-icon').on('click',function(){
        if(on){
            $(this).next('.side-nav').animate({height:'6rem'});
            on=false;
        }else{
            $(this).next('.side-nav').animate({height:0});
            on=true;
        }
    });
    /*交卷*/
    $('.side-nav .submit-icon').on('click',function(){
        $(".dialog").show();
        $(this).parents('.side-nav').animate({height:0});
        //关闭dialog
        $(".cancle_button").tap(function() {
            $(".dialog").hide();
        });
        //点击确定提交
        $("#submit-btn").tap(function() {
            //关闭dialog
            $(".dialog").hide();
            window.location.href='test-result.html';
        });
        on=true;
    });
    /*收藏试卷*/
    $('.side-nav .ck-icon').on('click',function(){
        $(this).addClass('clicked').parents('.side-nav').animate({height:0});
        on=true;
    });
}

/*wrong-topic.html页面错题筛选*/
/*头部下拉菜单*/
function  downList(btn){
    btn.on('click',function(){
        var shadow=$('.shadow');
        var _this=$(this);
        if($(this).hasClass('active')){
            $(this).removeClass('active').next().hide();
            shadow.hide();
        }
        else{
            $(this).addClass('active').next().show();
            shadow.show();
            shadow.on('click',function(){
                _this.removeClass('active').next().hide();
                $(this).hide();
            });
            new SelectItem($('.down-list').eq(0));
            new SelectItem($('.down-list').eq(1));
        }
    });

}

/*高亮显示下拉菜单中选中的值*/
function SelectItem(list){
    this.name='';
    this.list=$(list);
    this.showLight();
    this.cancel($('.down-btn .cancel'));
    this.sure($('.down-btn .sure'));
}
SelectItem.prototype.showLight=function(){
    this.list.find('li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
};
SelectItem.prototype.cancel=function(btn){
    btn.on('click',function(){
        $('.shadow').hide();
        $('.down-box').hide().prev('.name').removeClass('active');
    })
};
SelectItem.prototype.sure=function(btn){
    var _this=this;
    btn.on('click',function(){
        _this.name=_this.list.find('.active').text();
        if( _this.name!=''&& _this.name!=null){
            $('.shadow').hide();
            $('.down-box').hide().prev('.name').removeClass('active');
        }
    });
};

/*显示当前题目个数以及当前题号*/
function currentAndSum(){
    var sum= $('.aside_section').length;
    var current=parseInt($('.aside_section.current').index())+1;
  $('.question_sum').text(sum);
    $('.question_num').text(current);
}
window.onload=showBigPic;
/*点击图片放大显示*/
function showBigPic() {
    $('.section_list').on('tap', 'img', function (e) {
        var src=$(this).attr('src');
        var wd=$(window).width();
        var imgArr=[];
        var items='';
        $('.section_list').find('img').each(function(index,val){
            imgArr.push($(val).attr('src'));

        });
        var index=imgArr.indexOf(src);
        for(var i=index;i<imgArr.length;i++){
            items+="<div class='pic'><img src='"+imgArr[i]+"'></div>";
        }
        for(var j=0;j<index;j++){
            items+=" <div class='pic'><img src='"+imgArr[j]+"'></div>";
        }
        console.log(index);
        /*将获取到的所有图片有序的插入到body中*/
        $('body').append($("<div class='big-pic'><div class='flow-box clearfix'>"+items+"</div></div>"));
        $('.flow-box').width(wd*imgArr.length);

        /*所有图片添加触摸放大效果*/
        $('div.pic').each(function () {
            new RTP.PinchZoom($(this), {zoomOutFactor:3});
        });

        /*图片加载触摸放大功能之后添加左右滑动功能*/
        $(".pinch-zoom-container").on('swipeRight', function (e) {
            e.preventDefault();
            var index = $(this).index();
            if (index > 0) {
                $(this).parents('.flow-box').animate({left: -(index - 1) * wd});
            }
            e.stopPropagation();
        });
        $(".pinch-zoom-container").on('swipeLeft', function (e) {
            e.preventDefault();
            var index = $(this).index();
            if (index <imgArr.length-1) {
                $(this).parents('.flow-box').animate({left: -(index+1) * wd});
            }
            e.stopPropagation();
        });
    });
}
