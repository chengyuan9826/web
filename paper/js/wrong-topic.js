/**
 * Created by Administrator on 2016/8/2.
 */
$(function(){
    downList($('.hd-button .name'));
    slide($('.slide'),$('.paper-tit .num'));
});

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

/*滑动加载下一题*/
function slide(ul,numBox){
    var len=ul.children().length;
    var current=0;
    var itemWidth=$(window).width();
    ul.width(len*itemWidth);
    ul.children().width(itemWidth);
    var ht=$(window).height()-$('.paper-tit').height()-$('header').height();
    /*设置side-wrap的高度*/
    $('.slide-wrap').height(ht);
    numBox.find('.current').text(current+1);
    numBox.find('.sum').text(len);
    ul.children().on('swipeLeft',function(){
        if(current<len-1){
            ul.animate({left:-(current+1)*itemWidth});
            current++;
            numBox.find('.current').text(current+1);
        }
        else{
            layer.open({
                title: '提示',
                content: '这是最后一个！'
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
