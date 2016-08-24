/**
 * Created by Administrator on 2016/7/27.
 */
$(function () {
    showDownLoad();
    show();
    downList($('.tree-parent>li>.tree-name'));
    secondList($('.tree-second>.tree-name'));
    showAnswer($('.det-btn'));
    likeNum($('.statistics'));

    selected($('.down-window label '));
    headerList($(".paper-nav-list li"));
    carList($('.exam'));
    pageScroll();
    setListHeight($('.category-list'));
    showTip($('a.hide'));
    hoverShow();
});

/*鼠标滑过显示按钮*/
function hoverShow(){
$('.test-list .test-item').mouseenter(function(){
    $(this).find('.show-btn').stop().animate({'opacity':1});
}).mouseleave(function(){
    $(this).find('.show-btn').stop().animate({'opacity':0});
});
}

/*未上线显示提示*/
function showTip(btn){
  btn.live('click',function(){
      var box=$('.hide-box');
      box.show();
      box.live('click',function(){
           $(this).hide();
      });
      setTimeout(function(){
          $('.hide-box').hide();
      },2000);
      return false;
  })
}
/*设置侧边tree的高度*/
function setListHeight(list){
    var winHeight=$(window).height();
    var listTop=list.offset().top;
    list.height(winHeight-listTop);
}
/*头部下拉*/
function headerList(nav){
    nav.mouseover(function () {
        $(this).find(".nav_s").stop().slideDown();
    });
    nav.mouseleave(function () {
        $(this).find(".nav_s").stop().slideUp();
    });
}
/*显示试题篮内容*/
function carList(nav){
    nav.mouseover(function () {
        $(".cart-list").stop().slideDown();
    });
    nav.mouseleave(function () {
        $(".cart-list").stop().slideUp();
    });
}
/*点赞*/
function likeNum(btn){
    btn.find('.like').live('click',function(){
        $(this).addClass('active');
    })
}
/*显示答案与解析*/
function showAnswer(btn){
  btn.live('click',function(){
      var che=$(this).hasClass('active');
      if(che){
          $(this).removeClass('active');
          $('.answer-ana').slideUp();
      }
      else{
          $(this).addClass('active');
          $('.answer-ana').slideDown();
      }
  });
}
/*侧边列表显示*/
function downList(btn){
    btn.find('.tree-icon').live('click',function(){
        if($(this).parents('li').hasClass('active')){
            $(this).parents('.tree-name').next('.tree-list').slideUp();
            $(this).parents('li').removeClass('active');
        }
        else{
            $(this).parents('.tree-name').next('.tree-list').slideDown();
            $(this).parents('li').addClass('active');
        }
        return false;
    });
    return false;
}
function secondList(btn){
    btn.find('.tree-icon').live('click',function(){
        if($(this).parents('li').hasClass('current')){
            $(this).parent('.tree-name').next('.second-list').slideUp();
            $(this).parents('li').removeClass('current');
        }
        else{
            $(this).parent('.tree-name').next('.second-list').slideDown();
            $(this).parents('li').addClass('current');
        }
        return false;
    });
    return false;
}
/*显示册别和版本*/
function show(){
    var obj= new Value($('.category-type'),$('.show-window'));
    obj.showBox( );
    obj.getValue($('.show-window .type'),$('.edu-type'));
    obj.getValue($('.show-window .grade'),$('.edu-grade'));
    obj.sure($('.window-box .sure'));
    obj.cancel($('.window-box .cancel'));
}
/*显示下载选项*/
function showDownLoad(){
    var obj= new Value($('.edith'),$('.down-window'));
    obj.showBox();
    obj.close($('.down-window .close'));
    obj.sure($('.down-window .sure'));
    obj.cancel($('.down-window .cancel'));
}
function Value(btn,box){
    this.txt='';
    this.btn=btn;
    this.box=box;
}
Value.prototype.showBox=function(){
   var _this=this;
    this.btn.live('click', function () {
        _this.box.show();
        var boxHeight=_this.box.children().height();
        var winHeight=$(window).height();
        /*var boxWidth=_this.box.children().width();
        var winWidth=$(window).width();*/
        _this.box.children().animate({'marginTop':(winHeight-boxHeight)/2+'px'});
        /*_this.box.children().animate({'marginLeft':(winWidth-boxWidth)/2+'px'});*/
        var sTop = $('body').scrollTop();
        $(window).live('scroll', function () {
            $(this).scrollTop(sTop);
        });
    });
};
Value.prototype.getValue=function(list,txtBox){
    var _this=this;
    list.find('li').live('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        //_this.txt=$(this).text();
      //  txtBox.text(_this.txt);
    });
};
Value.prototype.sure=function(btn){
    var _this=this;
    btn.live('click',function(){
        _this.box.hide().children().css('marginTop',0);
    });
};
Value.prototype.cancel=function(btn){
    var _this=this;
    btn.live('click',function(){
        _this.box.hide().children().css('marginTop',0);
    });
};
Value.prototype.close=function(btn){
    var _this=this;
    btn.live('click',function(){
        _this.box.hide().children().css('marginTop',0);
    });
};
function selected(btn){
    btn.live('click',function(){
        $(this).addClass('active').parent().siblings().find('label').removeClass('active');
    });
}
function pageScroll(){
    $(window).scroll(function(){
        var sTop=$(window).scrollTop();
        if(sTop>60){
            $('#navBar').addClass('fixed');
            $('.left-div').addClass('fixed1');
        }
        else{
            $('#navBar').removeClass('fixed');
            $('.left-div').removeClass('fixed1');
        }
    });
}




