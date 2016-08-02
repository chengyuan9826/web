/**
 * Created by Administrator on 2016/8/1.
 */
$(function(){
    scrollLeft($('.coll-con'));
});

/*左滑删除*/
function scrollLeft(btn){
   btn.on('swipeLeft',function(){
       $(this).animate({left:'-7.6rem'},500);
   });
    btn.on('swipeRight',function(){
        $(this).animate({left:'0'},500);
    });
}
