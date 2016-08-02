//刘稳 2014-7-21 模板页数字滚动 
(function ($) {
    if (!document.defaultView || !document.defaultView.getComputedStyle) {
        var oldCurCSS = jQuery.curCSS;
        jQuery.curCSS = function (elem, name, force) {
            if (name === 'background-position') {
                name = 'backgroundPosition';
            }
            if (name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[name]) {
                return oldCurCSS.apply(this, arguments);
            }
            var style = elem.style;
            if (!force && style && style[name]) {
                return style[name];
            }
            return oldCurCSS(elem, 'backgroundPositionX', force) + ' ' + oldCurCSS(elem, 'backgroundPositionY', force);
        };
    }

    var oldAnim = $.fn.animate;
    $.fn.animate = function (prop) {
        if ('background-position' in prop) {
            prop.backgroundPosition = prop['background-position'];
            delete prop['background-position'];
        }
        if ('backgroundPosition' in prop) {
            prop.backgroundPosition = '(' + prop.backgroundPosition + ')';
        }
        return oldAnim.apply(this, arguments);
    };

    function toArray(strg) {
        strg = strg.replace(/left|top/g, '0px');
        strg = strg.replace(/right|bottom/g, '100%');
        strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
        var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
        return [parseFloat(res[1], 10), res[2], parseFloat(res[3], 10), res[4]];
    }

    $.fx.step.backgroundPosition = function (fx) {
        if (!fx.bgPosReady) {

            start = '-3px 0px';

            start = toArray(start);

            fx.start = [start[0], start[2]];

            var end = toArray(fx.end);
            fx.end = [end[0], end[2]];

            fx.unit = [end[1], end[3]];
            fx.bgPosReady = true;
        }

        var nowPosX = [];
        nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
        nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
        fx.elem.style.backgroundPosition = nowPosX[0] + ' ' + nowPosX[1];
    };
})(jQuery);


//刘稳 2014-07-21 滚动数字
function show_num(divname, n) {
    var it = $(divname + " i");
    var len = String(n).length;
    for (var i = 0; i < len; i++) {
        if (it.length <= i) {
            //Lpx 在IE7.0以下无法显示数字 20140806
            $(divname).append("<i style='text-indent:0px'></i>");
        }
        var num = String(n).charAt(i);
        var y = -parseInt(num) * 30;
        var obj = $(divname + " i").eq(i);
        obj.animate({
            backgroundPosition: '(-3px ' + String(y) + 'px)'
        }, 'slow', 'swing', function () { }
		);
    }
}
$(function(){
    navList($('#navWrapper .menu'));
    show_num('.t_num', '1234554');
});

function navList(nav){
    nav.mouseover(function () {
        $(this).find(".submenu").stop().slideDown();
        show_num('.t_num', '234556');
    });
    nav.mouseleave(function () {
        $(this).find(".submenu").stop().slideUp();
    });
}