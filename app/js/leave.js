/**
 * Created by Administrator on 2016/7/26.
 */
$(function(){
    downList($('.nav-name'));
    showSelect($('.nav-list'));
    showWindow($('.leave-btn-list .no'), $('.show-window'));
    cancel($('.reason-btn .cancel'));
    /*leave-apply.html*/
    show($('.js-item .value'));
    getValue($(".show-list li"));
    showBigSize($('.reason-list a'));
    $.mobile.autoInitializePage = false;
    var newjavascript={
        plugdatetime:function ($dateTxt,type) {
            var opt = {};
            opt.time = {preset : type};
            opt.date = {preset : type};
            opt.datetime = {
                preset : type,
                minDate: new Date(2010,1,01,00,00),
                maxDate: new Date(2020,12,31,24,59),
                stepMinute: 1
            };
            $dateTxt.val('').scroller('destroy').scroller(
                $.extend(opt[type],
                    {
                        theme: "sense-ui",
                        mode: "scroller",
                        display: "modal",
                        lang: "english",
                        yearText: "年",
                        monthText: "月",
                        dayText: "日",
                        hourText: "时",
                        minuteText: "分",
                        ampmText:"上午/下午",
                        setText: '确定',
                        cancelText: '取消',
                        dateFormat: 'yy-mm-dd'
                    }
                )
            );
        }
    };
    newjavascript.plugdatetime($("#startTime"), "datetime");
    newjavascript.plugdatetime($("#endTime"), "datetime");

});

function showBigSize(btn){
    btn.on('click',function(){
        var link=$(this).attr('href');
        $('body').append('<div class="scan-pic"><div class="table"><div class="tablecell"><img src="'+link+'" alt=""></div></div></div>');
        $('.scan-pic').on('click',function(){
            $(this).hide();
        });
        return false;
    });
}

/*点击显示下拉菜单*/
function downList(btn){
    btn.on('click',function(){
        btn.next('ul').animate({height:'0',overflow:'hidden'});
        btn.removeClass('active');
        $(this).addClass('active').next('ul').animate({'height':'12rem',overflowY:'scroll'});
        $('.shadow').show();
        $('.shadow').on('tap',function(){
            btn.next('ul').animate({height:'0',overflow:'hidden'});
            btn.removeClass('active');
            $(this).hide();
        });
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

/*显示弹出框*/
function showWindow(btn,win){
    btn.on('click',function(){
        win.animate({bottom:0},500);
        $('.shadow').show();
        return false;
    });
}
function cancel(btn){
    btn.on('tap',function(){
        $('.show-window').css({bottom:'-60%'});
        $('.shadow').hide();
    });
}
function getValue(btn){
    btn.on('click',function(){
        var txt=$(this).text();
        btn.removeClass('active');
        $(this).addClass('active');
        $(this).parents('.show-window').prev().text(txt);
        $(this).parents('.show-window').css({bottom:'-60%'});
        $('.shadow').hide();
    });
}

function show(btn){
    btn.on('click',function(){
        $(this).next('.show-window').animate({bottom:0},500);
        $('.shadow').show();
        return false;
    });
}

