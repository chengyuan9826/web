var nowpage = 0;
var $he = $(window).height();

$(function () {
// 添加事件监听
    addEventListener('load', function(){
        orientationChange();
        window.onorientationchange = orientationChange;
    });
    $(window).on('resize',function(){
         $he=window.innerHeight;
        $('.page').height($he);
    });
    $('.page').height($he);

   /* 展开下拉菜单*/
    $('.navBtn').on("click", function (e) {
        $(this).next('.nav').slideDown();
        return false;
    });

   /* 导航到相应模块*/
    $('.nav').find('a').on('click', function (e) {
        $(this).parents('.js-nav').slideUp(20);
        e.stopPropagation();
    });

   /* 点击空白收回下拉菜单*/
    $('body').on("click ", function (e) {
            var _con = $('.nav');   // 设置目标区域
            if(!_con.is(e.target) && _con.has(e.target).length === 0){
                $('.navBtn').next('.nav').slideUp();
            }
        return false;
    });
    fullPage();
    closePop();
    /*window.addEventListener('DOMContentLoaded', function() {
        var page = $('.page'),
            nav = window.navigator,
            ua = nav.userAgent,
            isFullScreen = nav.standalone;
        if (ua.indexOf('Android') !== -1) {
            // 56对应的是Android Browser导航栏的高度
            page.css('height',window.innerHeight + 'px') ;
        } else if (/iPhone|iPod|iPad/.test(ua)) {
            // 60对应的是Safari导航栏的高度
            page.css('height',window.innerHeight + (isFullScreen ? 0 : 60) + 'px');
        }
        setTimeout(scrollTo, 0, 0, 1);
    }, false);*/
});


function orientationChange() {
    switch(window.orientation) {
        case 0:
        alert("肖像模式 0,screen-width: " + screen.width + "; screen-height:" + screen.height);
        break;
        case -90:
        alert("左旋 -90,screen-width: " + screen.width + "; screen-height:" + screen.height);
        break;
        case 90:
        alert("右旋 90,screen-width: " + screen.width + "; screen-height:" + screen.height);
        break;
        case 180:
        alert("风景模式 180,screen-width: " + screen.width + "; screen-height:" + screen.height);
            break;
    }
}

function closePop(){
    $('.close-btn').on('click',function(){
        $('.pop-window').hide();
    });
}
function fullPage() {
    var items = $('.page-table').length;
    var arr = ["首页", "政教处", "校长", "会计", "教务处", "班主任", "学生/家长", "老师", "党团委", "总务处", "用户案例"];
    fullpage.initialize('.page-contains', {
        'css3':true,
        'anchors': ['page-index','page-secular','page-headmaster','page-accounts','page-Office','page-headteacher','page-student','page-teacher','page-affair','page-general','page-footer'],
        'menu': '.nav',
        afterLoad:function(anchorLink, index){
            var obj=$(this);
            moveUp(obj);
            $('.pageName').text(arr[obj.index()]);
        },
        onLeave:function(anchorLink, index){
            var obj=$(this);
            moveDown(obj);
        }
    });
}
function moveUp(obj) {
    obj.find('.page-des img').animate({'width': '100%', 'opacity': 1}, 600, function () {
        obj.find('.page-text p:nth-child(2n)').animate({"right": 0, 'opacity': 1}, 500);
        obj.find('.page-text p:nth-child(2n+1)').animate({"left": 0, 'opacity': 1}, 500);
        obj.find('.page-text-1').animate({'height':'100%'},600,function(){
            obj.find('.page-affair-pic').animate({"bottom": '8 %'}, 800);
        });
        obj.find('.page-text-2').animate({'opacity': 1}, 400);
        obj.find('.page-text .secular-tips1').animate({'opacity': 1}, 400,function(){
             $('.page-text .secular-tips2').animate({'opacity':1},400,function(){
                 $('.page-text .secular-tips3').animate({'opacity': 1},400,function(){
                     $('.page-text .secular-tips4').animate({'opacity':1},400,function(){
                         $('.page-text .secular-tips5').animate({'opacity':1,'bottom':'-30%'},400);
                     });
                 });
             });
        });
    });
    obj.find('div.page-down').not('.page-affair-pic').animate({"bottom": '14%'}, 1000);
}
function moveDown(obj) {
    obj.find('.page-des img').stop().animate({'width': '60%', 'opacity': 0.2}, 10);
    obj.find('.page-text p:nth-child(2n)').stop().animate({"right": "100%", 'opacity': 0}, 10);
    obj.find('.page-text p:nth-child(2n+1)').stop().animate({"left": "100%", 'opacity': 0}, 10);
    obj.find('.page-text-1').stop().animate({'height': 0});
    obj.find('.page-text-2').stop().animate({'opacity': 0}, 10);
    obj.find('.page-text .page-tip').stop().animate({'opacity': 0});
    obj.find('.page-down').animate({"bottom": "-60%"}, 1000);
}




