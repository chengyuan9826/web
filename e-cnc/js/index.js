/**
 * Created by Administrator on 2016/6/1.
 */
$('.hd-subnav').on('mouseenter',function(){
    $(this).find('.sld-area').stop().slideDown();
}).on('mouseleave',function(){
    $(this).find('.sld-area').stop().slideUp();
});

