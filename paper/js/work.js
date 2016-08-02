/**
 * Created by Administrator on 2016/8/2.
 */
$(function(){

    /*主观题查看解析*/
    var off=true;
    $('.look-analytic').on('click',function(){
        if(off){
            $('.analytic').show();
            off=false;
        }
        else{
            $('.analytic').hide();
            off=true;
        }

    });

    /*做题页面选择题*/
    $('.answer-list label').on('click',function(){
        $(this).addClass('active').parents().siblings().find('label').removeClass('active');
    });
    /*做题页面头部更多按钮*/
    var on=true;
    $('.side-icon').on('click',function(){
        if(on){
            $(this).next('.side-nav').show();
            on=false;
        }else{
            $(this).next('.side-nav').hide();
            on=true;
        }

    });
});