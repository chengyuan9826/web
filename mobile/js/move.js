var nowpage = 0;
var $he = $(window).height();

$(function () {
    $('.page').height($he);

    /*展开下拉菜单*/
    $('.navBtn').on("touchstart", function (e) {
        $(this).next('.nav').slideDown();
        return false;
    });
    /*导航到相应模块*/
    $('.nav').find('a').on('touchstart', function () {
        var obj = $(this);
        var index=obj.parent('li').index();
        goToModel(obj,index);
        $(this).parents('.nav').slideUp(200);
        return false;
    });

    /*首页导航模块*/
    $('.page-index-icon').on('touchstart', function () {
        var obj = $(this);
        var index=obj.index();
        goToModel(obj,index);
        return false;
    });

    /*点击空白收回下拉菜单*/
    $('body').on("touchstart", function (e) {
        $('.navBtn').next('.nav').slideUp();
        return false;
    });

    fullPage();
});
function fullPage() {
    var items = $('.page-table').length;
    var arr = ["首页", "政教处", "校长", "会计", "教务处", "班主任", "学生/家长", "老师", "党团委", "总务处", "用户案例"];
    //给最大的盒子增加事件监听
    $(".page-contains").swipe(
        {
            swipe: function (event, direction, distance, duration, fingerCount) {
                if (direction == "up") {
                    nowpage = nowpage + 1;

                } else if (direction == "down") {
                    nowpage = nowpage - 1;

                }
                if (nowpage > items - 1) {
                    nowpage = items - 1;
                }
                if (nowpage < 0) {
                    nowpage = 0;
                }

                moveDown($(".page-table"));
                $(".page-contains").animate({"top": nowpage * -100 + "%"}, 400, function () {
                    moveUp($(".page-table").eq(nowpage));
                    $('.pageName').text(arr[nowpage]);
                });
                $(".page-table").eq(nowpage).addClass("cur").siblings().removeClass("cur");
            }
        }
    );
}
function goToModel(obj,index) {
    var id = obj.attr('href');
    var $offHe = $(id).offset().top;
    var name = obj.text();
    $('.pageName').text(name);
    /*    $('html body').animate({'scrollTop': $offHe + 'px'}, 1000, function () {
     moveUp($(id));
     });*/
/*    var index = obj.parent('li').index();*/
    $('.page-contains').animate({'top': -index * 100 + '%'},800,  function () {
        moveUp($(id));
    });
    return false;
}
function moveUp(obj) {
    obj.find('.page-des img').animate({'width': '100%', 'opacity': 1}, 600, function () {
        obj.find('.page-text p:nth-child(2n)').animate({"right": 0, 'opacity': 1}, 500);
        obj.find('.page-text p:nth-child(2n+1)').animate({"left": 0, 'opacity': 1}, 500);
        obj.find('.page-text-1 p').css({'width': 'auto'});
        obj.find('.page-text-2').animate({'opacity': 1}, 400);
        obj.find('.page-text .page-tip').animate({'opacity': 1}, 400);
    });
    obj.find('.page-down').animate({"bottom": 0}, 600);
}

function moveDown(obj) {
    obj.find('.page-des img').animate({'width': '60%', 'opacity': 0.2}, 10);
    obj.find('.page-text p:nth-child(2n)').animate({"right": "100%", 'opacity': 0}, 10);
    obj.find('.page-text p:nth-child(2n+1)').animate({"left": "100%", 'opacity': 0}, 10);
    obj.find('.page-text-1 p').css({'width': 0});
    obj.find('.page-text-2').animate({'opacity': 0}, 10);
    obj.find('.page-text .page-tip').animate({'opacity': 0}, 10);
    obj.find('.page-down').animate({"bottom": "-48%"}, 10);
}


