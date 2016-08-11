/**
 * Created by Administrator on 2016/8/3.
 */
/*滑动加载下一题*/
$(function(){
    slide($('.slide'),$('.paper-tit .num'));
});
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
